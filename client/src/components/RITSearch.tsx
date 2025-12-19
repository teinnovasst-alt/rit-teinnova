import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
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

interface RITSearchProps {
  chapters: Chapter[];
  onArticleSelect: (chapterNum: number, articleNum: number) => void;
}

interface SearchResult {
  chapterNumber: number;
  chapterTitle: string;
  articleNumber: number;
  articleTitle: string;
  body: string;
}

/**
 * Componente de Búsqueda del RIT
 * Permite buscar por palabras clave, números de artículos y capítulos
 */
export default function RITSearch({ chapters, onArticleSelect }: RITSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    chapters.forEach((chapter) => {
      chapter.articles.forEach((article) => {
        // Buscar en número de artículo
        if (article.number.toString().includes(query)) {
          searchResults.push({
            chapterNumber: chapter.number,
            chapterTitle: chapter.title,
            articleNumber: article.number,
            articleTitle: article.title,
            body: article.body,
          });
          return;
        }

        // Buscar en título del artículo
        if (article.title.toLowerCase().includes(query)) {
          searchResults.push({
            chapterNumber: chapter.number,
            chapterTitle: chapter.title,
            articleNumber: article.number,
            articleTitle: article.title,
            body: article.body,
          });
          return;
        }

        // Buscar en cuerpo del artículo
        if (article.body.toLowerCase().includes(query)) {
          searchResults.push({
            chapterNumber: chapter.number,
            chapterTitle: chapter.title,
            articleNumber: article.number,
            articleTitle: article.title,
            body: article.body,
          });
        }
      });
    });

    return searchResults;
  }, [searchQuery, chapters]);

  const handleSelectResult = (result: SearchResult) => {
    onArticleSelect(result.chapterNumber, result.articleNumber);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por número de artículo, palabra clave..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isOpen && searchQuery.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="divide-y">
              {results.slice(0, 20).map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left p-3 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-sm text-gray-500 font-medium">
                    {result.chapterTitle}
                  </div>
                  <div className="text-blue-600 font-semibold">
                    Artículo {result.articleNumber}. {result.articleTitle}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {result.body.substring(0, 100)}...
                  </div>
                </button>
              ))}
              {results.length > 20 && (
                <div className="p-3 text-center text-sm text-gray-500">
                  +{results.length - 20} resultados más
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se encontraron resultados para "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
