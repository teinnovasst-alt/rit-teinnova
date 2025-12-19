import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  number: number;
  title: string;
  body: string;
}

interface Chapter {
  number: number;
  title: string;
  articles: Article[];
}

interface TableOfContentsProps {
  chapters: Chapter[];
  activeArticle?: { chapterNum: number; articleNum: number };
  onArticleSelect: (chapterNum: number, articleNum: number) => void;
}

/**
 * Componente de Tabla de Contenidos
 * Muestra la estructura jerárquica del RIT con capítulos y artículos
 * Permite navegación rápida entre secciones
 */
export default function TableOfContents({
  chapters,
  activeArticle,
  onArticleSelect,
}: TableOfContentsProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(
    new Set([1]) // Expandir el primer capítulo por defecto
  );

  const toggleChapter = (chapterNum: number) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterNum)) {
      newExpanded.delete(chapterNum);
    } else {
      newExpanded.add(chapterNum);
    }
    setExpandedChapters(newExpanded);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">
        Tabla de Contenidos
      </h2>

      <div className="space-y-1">
        {chapters.map((chapter) => (
          <div key={chapter.number} className="mb-2">
            {/* Encabezado del capítulo */}
            <button
              onClick={() => toggleChapter(chapter.number)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 text-left">
                {chapter.title}
              </span>
              {expandedChapters.has(chapter.number) ? (
                <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </button>

            {/* Lista de artículos */}
            {expandedChapters.has(chapter.number) && (
              <div className="ml-2 space-y-1 mt-1 border-l-2 border-gray-200 pl-3">
                {chapter.articles.map((article) => {
                  const isActive =
                    activeArticle?.chapterNum === chapter.number &&
                    activeArticle?.articleNum === article.number;

                  return (
                    <button
                      key={article.number}
                      onClick={() =>
                        onArticleSelect(chapter.number, article.number)
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-xs ${
                        isActive
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-semibold">Art. {article.number}</span>
                      <span className="ml-2 truncate">{article.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
