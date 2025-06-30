import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { closestCorners, DndContext } from "@dnd-kit/core";

const Alldata: React.FC = () => {
  const [expirienceData, setExpirienceData] = useState(null);
  const [educationData, setEducationData] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const reload = () => {
      setExpirienceData(
        JSON.parse(localStorage.getItem("expirience") || "null")
      );
      setEducationData(JSON.parse(localStorage.getItem("education") || "null"));
      setSkillsData(JSON.parse(localStorage.getItem("skills") || "null"));
      setAboutData(JSON.parse(localStorage.getItem("about-me") || "null"));
    };

    reload();
    window.addEventListener("resume-data-updated", reload);
    return () => window.removeEventListener("resume-data-updated", reload);
  }, []);

  const review = useMemo(
    () => [
      { id: 1, key: "expirience", title: "Опыт работы", data: expirienceData },
      { id: 2, key: "education", title: "Образование", data: educationData },
      { id: 3, key: "skills", title: "Навыки", data: skillsData },
      { id: 4, key: "about-me", title: "О себе", data: aboutData },
    ],
    [expirienceData, educationData, skillsData, aboutData]
  );

  return (
    <DndContext collisionDetection={closestCorners}>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        <SortableContext
          items={review.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {review.map((section) => {
            const { attributes, listeners, setNodeRef, transform, transition } =
              useSortable({ id: section.id });
            const style = {
              transition,
              transform: CSS.Transform.toString(transform),
            };

            return (
              <section
                key={section.id}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                ref={setNodeRef}
                {...attributes}
                style={style}
              >
                <h2
                  className="text-xl font-semibold text-gray-800 mb-4 cursor-move"
                  {...listeners}
                >
                  {section.title}
                </h2>
                {section.data ? (
                  <div className="space-y-1 text-gray-700">
                    {section.key === "expirience" && (
                      <>
                        <p>
                          <strong>Должность:</strong>{" "}
                          {section.data["должность"]}
                        </p>
                        <p>
                          <strong>Компания:</strong> {section.data["компания"]}
                        </p>
                        <p>
                          <strong>Период:</strong> {section.data["начало"]} —{" "}
                          {section.data["конец"]}
                        </p>
                      </>
                    )}
                    {section.key === "education" && (
                      <>
                        <p>
                          <strong>Учебное заведение:</strong>{" "}
                          {section.data["учебное заведение"]}
                        </p>
                        <p>
                          <strong>Специальность:</strong>{" "}
                          {section.data["специальность"]}
                        </p>
                        <p>
                          <strong>Годы обучения:</strong>{" "}
                          {section.data["год начала"]} —{" "}
                          {section.data["год окончания"]}
                        </p>
                      </>
                    )}
                    {section.key === "skills" && (
                      <>
                        <p>
                          <strong>Навык:</strong> {section.data["skill"]}
                        </p>
                        <p>
                          <strong>Уровень:</strong> {section.data["level"]}
                        </p>
                      </>
                    )}
                    {section.key === "about-me" && (
                      <>
                        <p>
                          <strong>Описание:</strong>{" "}
                          {section.data["aboutPerson"]}
                        </p>
                        <p>
                          <strong>Языки:</strong> {section.data["language"]}
                        </p>
                        <p>
                          <strong>Местоположение:</strong>{" "}
                          {section.data["location"]}
                        </p>
                      </>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => {
                        localStorage.removeItem(section.key);
                        window.dispatchEvent(new Event("resume-data-updated"));
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">нет данных</p>
                )}
              </section>
            );
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default Alldata;
