interface Props {
  expModal: boolean;
  setExpModal: (value: boolean) => void;
}
import { useForm } from "react-hook-form";

const ModalExperience: React.FC<Props> = ({ expModal, setExpModal }) => {
  if (!expModal) return null;

  const { register, handleSubmit, reset } = useForm();

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center backdrop-blur-sm">
      {/* Карточка модалки */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 w-full max-w-md mx-4 p-0 overflow-hidden rounded-2xl shadow-2xl border border-gray-200/70 dark:border-neutral-700">
        {/* Хедер с градиентом (изменил на indigo для отличия) */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Добавление опыта работы
            </h2>
            <button
              onClick={() => setExpModal(false)}
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
            className="space-y-4"
            onSubmit={handleSubmit((data) => {
              localStorage.setItem("expirience", JSON.stringify(data));
              reset();
            })}
          >
            {/* Поле должности */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-indigo-500 transition-colors">
                Должность
              </label>
              <input
                {...register("должность")}
                type="text"
                placeholder="Например: Frontend разработчик"
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Поле компании */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-indigo-500 transition-colors">
                Компания
              </label>
              <input
                {...register("компания")}
                type="text"
                placeholder="Например: Яндекс"
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Период работы */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-indigo-500 transition-colors">
                  Начало работы
                </label>
                <input
                  {...register("начало")}
                  type="text"
                  placeholder="Месяц/Год"
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-indigo-500 transition-colors">
                  Окончание
                </label>
                <input
                  {...register("конец")}
                  type="text"
                  placeholder="Месяц/Год или н.в."
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Сохранить опыт работы
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalExperience;
