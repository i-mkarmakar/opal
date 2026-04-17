"use client";

interface MessageBubbleProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          message.role === "user"
            ? "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
