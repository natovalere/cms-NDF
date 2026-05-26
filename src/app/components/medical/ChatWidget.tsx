import { useState } from "react";
import { MessageCircle, X, Send, Stethoscope } from "lucide-react";

type ChatSender = "bot" | "user";

interface ChatMessage {
  text: string;
  sender: ChatSender;
  time: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Bonjour ! Je suis l'assistant du centre médical. Comment puis-je vous aider ?",
      sender: "bot",
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const phoneNumber = "+228 70 84 22 22 / 79 79 04 79";

  const quickReplies = [
    "Prendre rendez-vous",
    "Horaires",
    "Services",
    "Urgences",
  ];

  const getBotResponse = (message: string) => {
    const msg = message.toLowerCase();

    if (msg.includes("rendez") || msg.includes("rdv") || msg.includes("appointment")) {
      return `Pour prendre rendez-vous, veuillez appeler le ${phoneNumber} ou utiliser notre formulaire en ligne.`;
    }

    if (msg.includes("horaire") || msg.includes("ouverture") || msg.includes("heure")) {
      return "Nous sommes ouverts du lundi au vendredi de 07:00 à 18:00 et le samedi de 08:00 à 14:00. Service d'urgence disponible 24h/24.";
    }

    if (msg.includes("service") || msg.includes("soin")) {
      return "Nous offrons : Médecine générale, Pédiatrie, Gynécologie, Laboratoire, Pharmacie, Radiologie, Cardiologie et bien d'autres services.";
    }

    if (msg.includes("urgence") || msg.includes("urgent")) {
      return `Pour toute urgence, appelez immédiatement le ${phoneNumber} ou rendez-vous directement au centre médical.`;
    }

    if (msg.includes("adresse") || msg.includes("localisation") || msg.includes("où")) {
      return "Nous sommes situés à Avedji, Lomé, Togo.";
    }

    return `Je suis désolé, je ne peux pas répondre précisément à cette question. Veuillez contacter directement le centre au ${phoneNumber}.`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const responseText = getBotResponse(inputMessage);
    setInputMessage("");

    setTimeout(() => {
      const botResponse: ChatMessage = {
        text: responseText,
        sender: "bot",
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage: ChatMessage = {
      text: reply,
      sender: "user",
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const responseText = getBotResponse(reply);

    setTimeout(() => {
      const botResponse: ChatMessage = {
        text: responseText,
        sender: "bot",
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#10B981] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-96 h-[70vh] sm:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-[#E5E7EB]">
          <div className="bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-[#2563EB]" />
              </div>

              <div>
                <h3>Assistant virtuel</h3>
                <p className="text-xs text-white/80">En ligne</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "user" ? "bg-[#2563EB] text-white" : "bg-[#F3F4F6] text-[#1F2937]"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-[#6B7280]"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-[#6B7280] text-center">Suggestions rapides :</p>

                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="bg-white border-2 border-[#E5E7EB] text-[#1F2937] px-3 py-2 rounded-lg hover:border-[#2563EB] transition-colors text-sm"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t-2 border-[#E5E7EB]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2 border-2 border-[#E5E7EB] rounded-xl focus:border-[#2563EB] focus:outline-none"
              />

              <button
                onClick={handleSendMessage}
                className="bg-[#2563EB] text-white p-2 rounded-xl hover:bg-[#1D4ED8] transition-colors"
                aria-label="Envoyer le message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
