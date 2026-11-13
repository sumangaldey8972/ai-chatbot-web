"use client";

import { useEffect, useRef, useState } from "react";
import { List } from "@phosphor-icons/react";

import { IconButton } from "@/components/ui/icon-button";
import { MOCK_CONVERSATIONS } from "@/features/chat/data/mock-conversations";
import type { ConversationSummary, ModelId } from "@/features/chat/types/chat";

import { Composer } from "./composer";
import { Conversation } from "./conversation";
import { NewChat } from "./new-chat";
import { Sidebar } from "./sidebar";
import { ThinkingResponse } from "./thinking-response";

const DEFAULT_PROMPT = "Can you help me build a focused morning routine for better productivity and energy?";

export function ChatShell() {
  const [conversations, setConversations] = useState<ConversationSummary[]>(MOCK_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<ConversationSummary>(MOCK_CONVERSATIONS[0]);
  const [model, setModel] = useState<ModelId>("auto");
  const [draft, setDraft] = useState("");
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isFreshConversation, setIsFreshConversation] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const thinkingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
    };
  }, []);

  function stopThinking() {
    if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
    thinkingTimer.current = null;
    setIsThinking(false);
  }

  function handleNewChat() {
    stopThinking();
    setActiveConversation({ id: "new", title: "New chat" });
    setPrompt("");
    setDraft("");
    setIsNewChat(true);
    setIsFreshConversation(false);
    setIsModelMenuOpen(false);
    setIsSidebarOpen(false);
  }

  function handleConversationSelect(conversation: ConversationSummary) {
    stopThinking();
    setActiveConversation(conversation);
    setIsNewChat(false);
    setIsFreshConversation(false);
    setPrompt(
      conversation.id === "morning-routine"
        ? DEFAULT_PROMPT
        : `Let's continue: ${conversation.title.toLowerCase()}.`,
    );
    setIsSidebarOpen(false);
  }

  function handleSubmit() {
    const nextMessage = draft.trim();
    if (!nextMessage || isThinking) return;

    if (isNewChat) {
      const newConversation = {
        id: `conversation-${Date.now()}`,
        title: nextMessage.length > 42 ? `${nextMessage.slice(0, 42)}…` : nextMessage,
      };
      setConversations((current) => [newConversation, ...current]);
      setActiveConversation(newConversation);
      setIsNewChat(false);
      setIsFreshConversation(true);
    }

    setPrompt(nextMessage);
    setDraft("");
    setIsModelMenuOpen(false);
    setIsThinking(true);
    thinkingTimer.current = setTimeout(() => {
      setIsThinking(false);
      thinkingTimer.current = null;
    }, 2400);
  }

  return (
    <main className="flex h-dvh overflow-hidden bg-[var(--canvas)] text-[var(--ink)]">
      <Sidebar
        conversations={conversations}
        activeId={activeConversation.id}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelect={handleConversationSelect}
      />

      <section className="relative flex min-w-0 flex-1 flex-col">
        <IconButton
          label="Open sidebar"
          onClick={() => setIsSidebarOpen(true)}
          className="absolute left-4 top-4 z-20 bg-[var(--canvas)]/85 shadow-sm backdrop-blur lg:hidden"
        >
          <List size={20} />
        </IconButton>
        <div className="chat-scroll min-h-0 flex-1 overflow-y-auto">
          {isNewChat ? (
            <NewChat onSuggestionSelect={setDraft} />
          ) : isThinking ? (
            <ThinkingResponse prompt={prompt} />
          ) : (
            <Conversation prompt={prompt} variant={isFreshConversation ? "fresh" : "routine"} />
          )}
        </div>
        <Composer
          draft={draft}
          model={model}
          isThinking={isThinking}
          isMenuOpen={isModelMenuOpen}
          onDraftChange={setDraft}
          onMenuToggle={() => setIsModelMenuOpen((open) => !open)}
          onModelChange={(nextModel) => {
            setModel(nextModel);
            setIsModelMenuOpen(false);
          }}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
}
