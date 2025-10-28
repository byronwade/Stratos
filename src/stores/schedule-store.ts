import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Job, Technician } from '@/components/schedule/schedule-types'

interface ScheduleState {
  // Data
  technicians: Map<string, Technician>
  jobs: Map<string, Job>

  // Loading states
  isLoading: boolean
  error: string | null
  lastSync: Date | null

  // Selection
  selectedJobId: string | null
  selectedTechnicianId: string | null

  // Actions - Technicians
  setTechnicians: (technicians: Technician[]) => void
  addTechnician: (technician: Technician) => void
  updateTechnician: (id: string, updates: Partial<Technician>) => void
  removeTechnician: (id: string) => void

  // Actions - Jobs
  setJobs: (jobs: Job[]) => void
  addJob: (job: Job) => void
  updateJob: (jobId: string, updates: Partial<Job>) => void
  moveJob: (jobId: string, newTechnicianId: string, newStartTime: Date, newEndTime: Date) => void
  deleteJob: (jobId: string) => void
  duplicateJob: (jobId: string, newStartTime: Date) => void

  // Actions - Selection
  selectJob: (jobId: string | null) => void
  selectTechnician: (technicianId: string | null) => void

  // Actions - Bulk operations
  bulkUpdateJobs: (updates: Array<{ jobId: string; updates: Partial<Job> }>) => void
  bulkDeleteJobs: (jobIds: string[]) => void

  // Actions - Sync
  syncWithServer: () => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Helpers
  getJobsByTechnician: (technicianId: string) => Job[]
  getJobsByDateRange: (startDate: Date, endDate: Date) => Job[]
  getTechnicianById: (id: string) => Technician | undefined
  getJobById: (id: string) => Job | undefined
  hasConflict: (technicianId: string, startTime: Date, endTime: Date, excludeJobId?: string) => boolean
}

export const useScheduleStore = create<ScheduleState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        technicians: new Map(),
        jobs: new Map(),
        isLoading: false,
        error: null,
        lastSync: null,
        selectedJobId: null,
        selectedTechnicianId: null,

        // Technician actions
        setTechnicians: (technicians) => {
          const techMap = new Map(technicians.map(t => [t.id, t]))
          set({ technicians: techMap })
        },

        addTechnician: (technician) => {
          set((state) => {
            const newTechnicians = new Map(state.technicians)
            newTechnicians.set(technician.id, technician)
            return { technicians: newTechnicians }
          })
        },

        updateTechnician: (id, updates) => {
          set((state) => {
            const newTechnicians = new Map(state.technicians)
            const existing = newTechnicians.get(id)
            if (existing) {
              newTechnicians.set(id, { ...existing, ...updates })
            }
            return { technicians: newTechnicians }
          })
        },

        removeTechnician: (id) => {
          set((state) => {
            const newTechnicians = new Map(state.technicians)
            newTechnicians.delete(id)

            // Remove all jobs for this technician
            const newJobs = new Map(state.jobs)
            for (const [jobId, job] of newJobs) {
              if (job.technicianId === id) {
                newJobs.delete(jobId)
              }
            }

            return {
              technicians: newTechnicians,
              jobs: newJobs,
              selectedTechnicianId: state.selectedTechnicianId === id ? null : state.selectedTechnicianId
            }
          })
        },

        // Job actions
        setJobs: (jobs) => {
          const jobMap = new Map(jobs.map(j => [j.id, j]))
          set({ jobs: jobMap })
        },

        addJob: (job) => {
          set((state) => {
            const newJobs = new Map(state.jobs)
            newJobs.set(job.id, job)
            return { jobs: newJobs }
          })
        },

        updateJob: (jobId, updates) => {
          set((state) => {
            const newJobs = new Map(state.jobs)
            const existing = newJobs.get(jobId)
            if (existing) {
              newJobs.set(jobId, { ...existing, ...updates })
            }
            return { jobs: newJobs }
          })
        },

        moveJob: (jobId, newTechnicianId, newStartTime, newEndTime) => {
          set((state) => {
            const newJobs = new Map(state.jobs)
            const existing = newJobs.get(jobId)
            if (existing) {
              newJobs.set(jobId, {
                ...existing,
                technicianId: newTechnicianId,
                startTime: newStartTime,
                endTime: newEndTime,
              })
            }
            return { jobs: newJobs }
          })
        },

        deleteJob: (jobId) => {
          set((state) => {
            const newJobs = new Map(state.jobs)
            newJobs.delete(jobId)
            return {
              jobs: newJobs,
              selectedJobId: state.selectedJobId === jobId ? null : state.selectedJobId
            }
          })
        },

        duplicateJob: (jobId, newStartTime) => {
          const job = get().jobs.get(jobId)
          if (!job) return

          const duration = job.endTime.getTime() - job.startTime.getTime()
          const newEndTime = new Date(newStartTime.getTime() + duration)

          const newJob: Job = {
            ...job,
            id: `${job.id}-copy-${Date.now()}`,
            startTime: newStartTime,
            endTime: newEndTime,
            status: 'scheduled',
          }

          get().addJob(newJob)
        },

        // Selection actions
        selectJob: (jobId) => set({ selectedJobId: jobId }),
        selectTechnician: (technicianId) => set({ selectedTechnicianId: technicianId }),

        // Bulk operations
        bulkUpdateJobs: (updates) => {
          set((state) => {
            const newJobs = new Map(state.jobs)
            updates.forEach(({ jobId, updates: jobUpdates }) => {
              const existing = newJobs.get(jobId)
              if (existing) {
                newJobs.set(jobId, { ...existing, ...jobUpdates })
              }
            })
            return { jobs: newJobs }
          })
        },

        bulkDeleteJobs: (jobIds) => {
          set((state) => {
            const newJobs = new Map(state.jobs)
            jobIds.forEach(id => newJobs.delete(id))
            return {
              jobs: newJobs,
              selectedJobId: jobIds.includes(state.selectedJobId || '') ? null : state.selectedJobId
            }
          })
        },

        // Sync
        syncWithServer: async () => {
          set({ isLoading: true, error: null })
          try {
            // TODO: Replace with actual API call
            const response = await fetch('/api/schedule')
            if (!response.ok) throw new Error('Failed to sync')

            const { technicians, jobs } = await response.json()

            get().setTechnicians(technicians)
            get().setJobs(jobs)
            set({ lastSync: new Date() })
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Unknown error' })
          } finally {
            set({ isLoading: false })
          }
        },

        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),

        // Helpers
        getJobsByTechnician: (technicianId) => {
          return Array.from(get().jobs.values()).filter(job => job.technicianId === technicianId)
        },

        getJobsByDateRange: (startDate, endDate) => {
          return Array.from(get().jobs.values()).filter(job => {
            return job.startTime >= startDate && job.endTime <= endDate
          })
        },

        getTechnicianById: (id) => get().technicians.get(id),

        getJobById: (id) => get().jobs.get(id),

        hasConflict: (technicianId, startTime, endTime, excludeJobId) => {
          const techJobs = get().getJobsByTechnician(technicianId)

          return techJobs.some(job => {
            if (excludeJobId && job.id === excludeJobId) return false

            // Check for overlap
            return (
              (startTime >= job.startTime && startTime < job.endTime) ||
              (endTime > job.startTime && endTime <= job.endTime) ||
              (startTime <= job.startTime && endTime >= job.endTime)
            )
          })
        },
      }),
      {
        name: 'schedule-storage',
        // Don't persist the Maps directly, convert to arrays
        partialize: (state) => ({
          technicians: Array.from(state.technicians.values()),
          jobs: Array.from(state.jobs.values()),
          lastSync: state.lastSync,
        }),
        // Rehydrate arrays back to Maps
        merge: (persistedState: any, currentState) => {
          const technicians = persistedState?.technicians
            ? new Map(persistedState.technicians.map((t: Technician) => [t.id, t]))
            : currentState.technicians

          const jobs = persistedState?.jobs
            ? new Map(persistedState.jobs.map((j: Job) => [j.id, j]))
            : currentState.jobs

          return {
            ...currentState,
            ...persistedState,
            technicians,
            jobs,
          }
        },
      }
    )
  )
)
