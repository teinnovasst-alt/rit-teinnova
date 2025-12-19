import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  number: number;
  title: string;
  body: string;
  chapterTitle: string;
  isActive?: boolean;
}

/**
 * Componente de Tarjeta de Artículo
 * Muestra un artículo individual con funcionalidad de copiar
 * Permite selección de texto para lectura y copia
 */
export default function ArticleCard({
  number,
  title,
  body,
  chapterTitle,
  isActive = false,
}: ArticleCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `Artículo ${number}. ${title}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <div
      className={`bg-white border-2 rounded-lg p-6 transition-all duration-200 ${
        isActive
          ? "border-blue-600 shadow-lg bg-blue-50"
          : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
      }`}
      id={`article-${number}`}
    >
      {/* Encabezado del artículo */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {chapterTitle}
          </div>
          <h3 className="text-lg font-bold text-blue-600">
            Artículo {number}
          </h3>
          <p className="text-sm font-semibold text-gray-700 mt-1">{title}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="flex-shrink-0"
          title="Copiar artículo"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4 text-gray-600" />
          )}
        </Button>
      </div>

      {/* Separador */}
      <div className="h-px bg-gray-200 mb-4" />

      {/* Cuerpo del artículo - Permite selección de texto */}
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed select-text">
        {body.split("\n").map((paragraph, idx) => (
          <p key={idx} className="mb-3 last:mb-0 whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
