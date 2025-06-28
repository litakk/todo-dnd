interface Props {
  skillsModal: boolean;
  setSkillsModal: (value: boolean) => void;
}

import { useForm } from "react-hook-form";

const ModalSkills: React.FC<Props> = ({ skillsModal, setSkillsModal }) => {
  if (!skillsModal) return null;

  const { register, handleSubmit, reset } = useForm();

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center backdrop-blur-sm">
      {/* Карточка модалки */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 w-full max-w-md mx-4 p-0 overflow-hidden rounded-2xl shadow-2xl border border-gray-200/70 dark:border-neutral-700">
        {/* Хедер с градиентом */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Добавление навыков
            </h2>
            <button
              onClick={() => setSkillsModal(false)}
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
              localStorage.setItem("skills", JSON.stringify(data));
              reset();
              setSkillsModal(false);
            })}
          >
            {/* Название навыка */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-blue-500 transition-colors">
                Навык
              </label>
              <input
                {...register("skill")}
                type="text"
                placeholder="Например: JavaScript"
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Уровень владения */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-focus-within:text-blue-500 transition-colors">
                Уровень
              </label>
              <select
                {...register("level")}
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="beginner">Начинающий</option>
                <option value="intermediate">Продвинутый</option>
                <option value="expert">Эксперт</option>
              </select>
            </div>
            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Сохранить навык
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalSkills;
