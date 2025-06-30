import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

interface Props {}

const Alldata: React.FC<Props> = () => {
  const [expirienceData, setExpirienceData] = useState(null);
  const [educationData, setEducationData] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const relod = () => {
      setExpirienceData(JSON.parse(localStorage.getItem("expirience") || "null"));
      setEducationData(JSON.parse(localStorage.getItem("education") || "null"));
      setSkillsData(JSON.parse(localStorage.getItem("skills") || "null"));
      setAboutData(JSON.parse(localStorage.getItem("about-me") || "null"));
    };

    relod();
    window.addEventListener("resume-data-updated", relod);
    return () => window.removeEventListener("resume-data-updated", relod);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
      {/* Опыт работы */}
      <section className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Опыт работы</h2>
        {expirienceData ? (
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-medium">Должность:</span> {expirienceData["должность"]}
            </p>
            <p>
              <span className="font-medium">Компания:</span> {expirienceData["компания"]}
            </p>
            <p>
              <span className="font-medium">Период:</span>{" "}
              {expirienceData["начало"]} — {expirienceData["конец"]}
            </p>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                localStorage.removeItem("expirience");
                setExpirienceData(null);
                window.dispatchEvent(new Event("resume-data-updated"));
              }}
            >
              Удалить
            </Button>
          </div>
        ) : (
          <p className="text-gray-500 italic">нет данных об опыте работы</p>
        )}
      </section>

      {/* Образование */}
      <section className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Образование</h2>
        {educationData ? (
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-medium">Учебное заведение:</span> {educationData["учебное заведение"]}
            </p>
            <p>
              <span className="font-medium">Специальность:</span> {educationData["специальность"]}
            </p>
            <p>
              <span className="font-medium">Годы обучения:</span>{" "}
              {educationData["год начала"]} — {educationData["год окончания"]}
            </p>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                localStorage.removeItem("education");
                setEducationData(null);
                window.dispatchEvent(new Event("resume-data-updated"));
              }}
            >
              Удалить
            </Button>
          </div>
        ) : (
          <p className="text-gray-500 italic">нет данных об образовании</p>
        )}
      </section>

      {/* Навыки */}
      <section className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Навыки</h2>
        {skillsData ? (
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-medium">Навык:</span> {skillsData["skill"]}
            </p>
            <p>
              <span className="font-medium">Уровень:</span> {skillsData["level"]}
            </p>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                localStorage.removeItem("skills");
                setSkillsData(null);
                window.dispatchEvent(new Event("resume-data-updated"));
              }}
            >
              Удалить
            </Button>
          </div>
        ) : (
          <p className="text-gray-500 italic">нет данных о навыках</p>
        )}
      </section>

      {/* О себе */}
      <section className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">О себе</h2>
        {aboutData ? (
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-medium">Описание:</span> {aboutData["aboutPerson"]}
            </p>
            <p>
              <span className="font-medium">Языки:</span> {aboutData["language"]}
            </p>
            <p>
              <span className="font-medium">Местоположение:</span> {aboutData["location"]}
            </p>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                localStorage.removeItem("about-me");
                setAboutData(null);
                window.dispatchEvent(new Event("resume-data-updated"));
              }}
            >
              Удалить
            </Button>
          </div>
        ) : (
          <p className="text-gray-500 italic">нет данных "О себе"</p>
        )}
      </section>
    </div>
  );
};

export default Alldata;
