import { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import DisclaimerModal from "@/components/DisclaimerModal";
import RITSearch from "@/components/RITSearch";
import TableOfContents from "@/components/TableOfContents";
import ArticleCard from "@/components/ArticleCard";
import ritData from "@/data/rit.json";

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

/**
 * Página Principal del RIT
 * Muestra el Reglamento Interno de Trabajo con:
 * - Modal de disclaimer inicial
 * - Buscador integrado
 * - Tabla de contenidos navegable
 * - Artículos en cajas individuales
 * - Diseño responsivo para móviles
 */
export default function RIT() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeArticle, setActiveArticle] = useState<{
    chapterNum: number;
    articleNum: number;
  } | null>(null);
  const [chapters] = useState<Chapter[]>(ritData.chapters);

  // Cargar el estado del disclaimer desde localStorage
  useEffect(() => {
    const accepted = localStorage.getItem("rit_disclaimer_accepted");
    if (accepted === "true") {
      setDisclaimerAccepted(true);
    }
  }, []);

  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    localStorage.setItem("rit_disclaimer_accepted", "true");
  };

  const handleArticleSelect = (chapterNum: number, articleNum: number) => {
    setActiveArticle({ chapterNum, articleNum });

    // Scroll al artículo seleccionado
    setTimeout(() => {
      const element = document.getElementById(`article-${articleNum}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Obtener el artículo activo
  const getActiveArticle = () => {
    if (!activeArticle) {
      // Si no hay artículo activo, mostrar el primero
      const firstChapter = chapters[0];
      if (firstChapter && firstChapter.articles.length > 0) {
        return {
          chapter: firstChapter,
          article: firstChapter.articles[0],
        };
      }
      return null;
    }

    const chapter = chapters.find((ch) => ch.number === activeArticle.chapterNum);
    const article = chapter?.articles.find(
      (art) => art.number === activeArticle.articleNum
    );

    if (chapter && article) {
      return { chapter, article };
    }
    return null;
  };

  const activeData = getActiveArticle();

  return (
    <>
      {/* Modal de Disclaimer */}
      <DisclaimerModal
        isOpen={!disclaimerAccepted}
        onAccept={handleDisclaimerAccept}
      />

      {/* Contenedor principal */}
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Tabla de Contenidos */}
        <div
          className={`${
            sidebarOpen ? "w-80" : "w-0"
          } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-sm font-bold text-gray-900 truncate">
              RIT Teinnova
            </h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <TableOfContents
              chapters={chapters}
              activeArticle={activeArticle || undefined}
              onArticleSelect={handleArticleSelect}
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Encabezado */}
          <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
            <div className="px-4 py-4 sm:px-6 flex items-center justify-between gap-4">
              {/* Botón de menú */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Título y logo */}
              <div className="flex items-center gap-3 flex-1">
                <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    RIT Teinnova
                  </h1>
                  <p className="text-xs text-gray-500">
                    Reglamento Interno de Trabajo
                  </p>
                </div>
              </div>

              {/* Información de confidencialidad */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-red-50 rounded-lg border border-red-200">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <span className="text-xs font-semibold text-red-700">
                  Confidencial
                </span>
              </div>
            </div>

            {/* Buscador */}
            <div className="px-4 sm:px-6 pb-4">
              <RITSearch chapters={chapters} onArticleSelect={handleArticleSelect} />
            </div>
          </header>

          {/* Área de contenido */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Encabezado del capítulo */}
              {activeData && (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {activeData.chapter.title}
                    </h2>
                    <div className="h-1 w-16 bg-blue-600 rounded" />
                  </div>

                  {/* Artículo activo */}
                  <ArticleCard
                    number={activeData.article.number}
                    title={activeData.article.title}
                    body={activeData.article.body}
                    chapterTitle={activeData.chapter.title}
                    isActive={true}
                  />

                  {/* Artículos relacionados del mismo capítulo */}
                  {activeData.chapter.articles.length > 1 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Otros artículos en este capítulo
                      </h3>
                      <div className="grid gap-4">
                        {activeData.chapter.articles
                          .filter((art) => art.number !== activeData.article.number)
                          .map((article) => (
                            <button
                              key={article.number}
                              onClick={() =>
                                handleArticleSelect(
                                  activeData.chapter.number,
                                  article.number
                                )
                              }
                              className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                            >
                              <div className="text-blue-600 font-semibold">
                                Artículo {article.number}
                              </div>
                              <div className="text-gray-700 font-medium mt-1">
                                {article.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-2 line-clamp-2">
                                {article.body.substring(0, 120)}...
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
