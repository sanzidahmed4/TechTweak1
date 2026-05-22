"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

function SortableRow({ item }: { item: { id: string; name: string } }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 border mb-2 bg-white flex items-center justify-between ${
        isDragging ? "shadow-xl border-blue-500 scale-105" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div 
          ref={setActivatorNodeRef}
          {...attributes} 
          {...listeners} 
          className="cursor-grab touch-none p-2 bg-slate-100 rounded"
        >
          <GripVertical />
        </div>
        <div>{item.name}</div>
      </div>
    </div>
  );
}

export default function TestDrag() {
  const [items, setItems] = useState([
    { id: "1", name: "Apple" },
    { id: "2", name: "Samsung" },
    { id: "3", name: "Xiaomi" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="p-20 max-w-md mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableRow key={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
