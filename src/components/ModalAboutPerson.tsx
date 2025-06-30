interface Props {
  aboutModal: boolean;
  setAboutModal: (value: boolean) => void;
}

import { useForm } from "react-hook-form";

const ModalAboutPerson: React.FC<Props> = ({ aboutModal, setAboutModal }) => {
  if (!aboutModal) return null;

  const { register, handleSubmit, reset } = useForm();

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center backdrop-blur-sm">
      {/* Карточка модалки */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 w-full max-w-md mx-4 p-0 overflow-hidden rounded-2xl shadow-2xl border border-gray-200/70 dark:border-neutral-700">
        {/* Хедер с градиентом (зеленый для отличия) */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">О себе</h2>
            <button
              onClick={() => setAboutModal(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Закрыть"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Тело модалки */}
        <div className="p-6 space-y-6">
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              localStorage.setItem("about-me", JSON.stringify(data));
              window.dispatchEvent(new Event("resume-data-updated"));
              console.log("dispatching resume-data-updated");

              reset();
              setAboutModal(false);
            })}
          >
            {/* Основное поле "О себе" */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-green-500 transition-colors">
                Расскажите о себе
              </label>
              <textarea
                {...register("aboutPerson")}
                placeholder="Опишите ваш опыт, навыки и профессиональные качества"
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[200px]"
              />
            </div>

            {/* Дополнительные поля */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-green-500 transition-colors">
                  Языки
                </label>
                <input
                  {...register("language")}
                  type="text"
                  placeholder="Например: Русский, Английский"
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-green-500 transition-colors">
                  Локация
                </label>
                <input
                  {...register("location")}
                  type="text"
                  placeholder="Город проживания"
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Сохранить информацию
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAboutPerson;
