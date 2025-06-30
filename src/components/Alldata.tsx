import React from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SECTION_META = {
  expirience: { id: "expirience", title: "Опыт работы" },
  education: { id: "education", title: "Образование" },
  skills: { id: "skills", title: "Навыки" },
  "about-me": { id: "about-me", title: "О себе" },
};

export interface SectionData {
  expirience: any;
  education: any;
  skills: any;
  "about-me": any;
}

interface AlldataProps {
  order: string[];
  setOrder: (order: string[]) => void;
  data: SectionData;
  reload: () => void;
}

function SortableSection({
  id,
  section,
  sectionData,
  onDelete,
}: {
  id: string;
  section: { id: string; title: string };
  sectionData: any;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 24,
    margin: "16px 0",
    background: isDragging ? "#f3f4f6" : "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 16,
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.7 : 1,
    userSelect: "none",
    boxShadow: isDragging ? "0 4px 16px rgba(0,0,0,0.08)" : undefined,
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <h2 style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>
        {section.title}
      </h2>
      {sectionData ? (
        <div style={{ marginBottom: 12 }}>
          {id === "expirience" && (
            <>
              <div>
                <b>Должность:</b> {sectionData["должность"]}
              </div>
              <div>
                <b>Компания:</b> {sectionData["компания"]}
              </div>
              <div>
                <b>Период:</b> {sectionData["начало"]} — {sectionData["конец"]}
              </div>
            </>
          )}
          {id === "education" && (
            <>
              <div>
                <b>Учебное заведение:</b> {sectionData["учебное заведение"]}
              </div>
              <div>
                <b>Специальность:</b> {sectionData["специальность"]}
              </div>
              <div>
                <b>Годы обучения:</b> {sectionData["год начала"]} —{" "}
                {sectionData["год окончания"]}
              </div>
            </>
          )}
          {id === "skills" && (
            <>
              <div>
                <b>Навык:</b> {sectionData["skill"]}
              </div>
              <div>
                <b>Уровень:</b> {sectionData["level"]}
              </div>
            </>
          )}
          {id === "about-me" && (
            <>
              <div>
                <b>Описание:</b> {sectionData["aboutPerson"]}
              </div>
              <div>
                <b>Языки:</b> {sectionData["language"]}
              </div>
              <div>
                <b>Местоположение:</b> {sectionData["location"]}
              </div>
            </>
          )}
        </div>
      ) : (
        <div style={{ color: "#888", fontStyle: "italic" }}>нет данных</div>
      )}
      <button
        onClick={onDelete}
        style={{
          padding: "4px 12px",
          borderRadius: 6,
          border: "1px solid #e57373",
          background: "#fff0f0",
          color: "#c62828",
          cursor: "pointer",
        }}
      >
        Удалить
      </button>
    </div>
  );
}

export default function Alldata({
  order,
  setOrder,
  data,
  reload,
}: AlldataProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => {
          const { active, over } = e;
          if (active.id !== over?.id) {
            const oldIndex = order.indexOf(active.id as string);
            const newIndex = order.indexOf(over?.id as string);
            setOrder(arrayMove(order, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {order.map((key) => {
            const section = SECTION_META[key as keyof typeof SECTION_META];
            const sectionData = data[key as keyof SectionData];
            return (
              <SortableSection
                key={key}
                id={key}
                section={section}
                sectionData={sectionData}
                onDelete={() => {
                  localStorage.removeItem(key);
                  window.dispatchEvent(new Event("resume-data-updated"));
                  reload();
                }}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
