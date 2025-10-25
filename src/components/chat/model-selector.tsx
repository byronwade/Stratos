"use client";

import { useState } from "react";
import { CheckCircleFillIcon, ChevronDownIcon, LogoOpenAI, LogoGoogle, LogoAnthropic } from "./icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Model {
	id: string;
	name: string;
	provider: string;
	icon: React.ReactNode;
}

const models: Model[] = [
	{
		id: "gpt-4o",
		name: "GPT-4O",
		provider: "OpenAI",
		icon: <LogoOpenAI />,
	},
	{
		id: "gpt-4-turbo",
		name: "GPT-4 Turbo",
		provider: "OpenAI",
		icon: <LogoOpenAI />,
	},
	{
		id: "claude-3-5-sonnet",
		name: "Claude 3.5 Sonnet",
		provider: "Anthropic",
		icon: <LogoAnthropic />,
	},
	{
		id: "claude-3-opus",
		name: "Claude 3 Opus",
		provider: "Anthropic",
		icon: <LogoAnthropic />,
	},
	{
		id: "gemini-pro",
		name: "Gemini Pro",
		provider: "Google",
		icon: <LogoGoogle />,
	},
];

interface ModelSelectorProps {
	value?: string;
	onValueChange?: (modelId: string) => void;
}

export function ModelSelector({ value = "gpt-4o", onValueChange }: ModelSelectorProps) {
	const [selectedModel, setSelectedModel] = useState(value);
	const currentModel = models.find((m) => m.id === selectedModel) ?? models[0];

	const handleSelect = (modelId: string) => {
		setSelectedModel(modelId);
		onValueChange?.(modelId);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="gap-2">
					{currentModel.icon}
					<span className="font-medium">{currentModel.name}</span>
					<ChevronDownIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[280px]">
				{models.map((model) => (
					<DropdownMenuItem key={model.id} onClick={() => handleSelect(model.id)} className="flex items-center gap-3 py-2">
						<div className="flex size-6 items-center justify-center">{model.icon}</div>
						<div className="flex flex-1 flex-col">
							<div className="font-medium">{model.name}</div>
							<div className="text-xs text-zinc-500">{model.provider}</div>
						</div>
						{model.id === selectedModel && (
							<div className="text-blue-600">
								<CheckCircleFillIcon />
							</div>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
