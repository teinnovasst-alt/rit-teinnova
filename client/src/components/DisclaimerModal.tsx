import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

/**
 * Modal de Advertencia - Disclaimer
 * Muestra un mensaje de confidencialidad y restricción de acceso al RIT
 * Solo permite continuar si el usuario acepta los términos
 */
export default function DisclaimerModal({ isOpen, onAccept }: DisclaimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-blue-600">
        {/* Encabezado */}
        <div className="border-b pb-4 p-6 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <h2 className="text-xl font-bold text-blue-600">
              Acceso Restringido - Reglamento Interno de Trabajo
            </h2>
          </div>
        </div>

        {/* Contenido */}
        <div className="space-y-4 p-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-lg text-blue-900 mb-2">
              TEINNOVA MAYORISTAS S.A.S.
            </p>
            <p className="text-sm text-blue-800">
              Reglamento Interno de Trabajo (RIT)
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="font-semibold text-yellow-900 mb-2">⚠️ ADVERTENCIA IMPORTANTE:</p>
              <p className="text-yellow-800">
                Este documento es de <strong>uso interno exclusivo</strong> de TEINNOVA MAYORISTAS S.A.S. 
                y está destinado únicamente para consulta por parte de los trabajadores de la empresa 
                y partes interesadas debidamente autorizadas.
              </p>
            </div>

            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="font-semibold text-red-900 mb-2">🚫 PROHIBICIÓN:</p>
              <p className="text-red-800">
                Está <strong>completamente prohibida</strong> la reproducción, distribución total o parcial, 
                y entrega a terceros no autorizados de este documento, salvo en caso de requerimiento de 
                autoridad competente o necesidad legal conforme a la normatividad vigente.
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">📋 ACCESO AUTORIZADO:</p>
              <p className="text-gray-800 mb-2">
                Solo pueden acceder a este documento:
              </p>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>Trabajadores activos de TEINNOVA MAYORISTAS S.A.S.</li>
                <li>Partes interesadas debidamente autorizadas</li>
                <li>Entidades reguladoras y autoridades competentes en materia laboral</li>
              </ul>
            </div>

            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="font-semibold text-red-900 mb-2">⛔ RESTRICCIÓN DE ACCESO:</p>
              <p className="text-red-800">
                Si <strong>NO eres trabajador de TEINNOVA MAYORISTAS S.A.S.</strong>, 
                <strong> no eres una parte interesada autorizada</strong>, 
                ni eres un ente regulador o autoridad competente en la materia, 
                <strong> por favor abstente de continuar</strong> y cierra esta ventana inmediatamente.
              </p>
            </div>
          </div>
        </div>

        {/* Pie de página con botones */}
        <div className="flex gap-3 p-6 border-t bg-gray-50 sticky bottom-0">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.close()}
          >
            No, Salir
          </Button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onAccept}
          >
            Sí, Entiendo y Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
