"use client";

import { useState, useTransition, useEffect } from "react";
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
import { GripVertical, Loader2 } from "lucide-react";
import Image from "next/image";
import BrandActions from "./BrandActions";
import { updateBrandsOrder } from "@/app/admin/brands/actions";
import { useRouter } from "next/navigation";

interface BrandItem {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  order: number;
}

function SortableBrandRow({ brand }: { brand: BrandItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: brand.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 px-6 flex items-center justify-between transition-colors bg-white ${
        isDragging ? "shadow-xl border border-primary scale-[1.02]" : "hover:bg-slate-50 border-b border-slate-100"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <div 
          ref={setActivatorNodeRef}
          {...attributes} 
          {...listeners} 
          className="cursor-grab touch-none hover:bg-slate-100 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
        >
          <GripVertical size={20} />
        </div>
        
        {/* Brand Info */}
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden shrink-0">
          {brand.logo_url ? (
            <div className="w-full h-full relative">
              <Image src={brand.logo_url} alt={brand.name} fill className="object-cover" sizes="48px" />
            </div>
          ) : (
            <span className="font-bold text-lg text-slate-400">{brand.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{brand.name}</h3>
          <p className="text-xs text-slate-500">/{brand.slug} • Order: {brand.order}</p>
        </div>
      </div>
      
      {/* Actions */}
      <BrandActions id={brand.id} />
    </div>
  );
}

export default function DraggableBrandList({ initialBrands }: { initialBrands: BrandItem[] }) {
  const router = useRouter();
  const [brands, setBrands] = useState(initialBrands);
  const [prevInitialBrands, setPrevInitialBrands] = useState(initialBrands);
  const [isPending, startTransition] = useTransition();

  const [isMounted, setIsMounted] = useState(false);

  // Sync props to state during render to avoid extra commit/flicker
  if (initialBrands !== prevInitialBrands) {
    setPrevInitialBrands(initialBrands);
    setBrands(initialBrands);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = brands.findIndex((b) => b.id === active.id);
      const newIndex = brands.findIndex((b) => b.id === over.id);

      const newBrands = arrayMove(brands, oldIndex, newIndex);
      
      // Update local state optimistic UI (Update order fields too)
      const locallyUpdated = newBrands.map((b, i) => ({ ...b, order: i }));
      setBrands(locallyUpdated);

      // Save to Database
      startTransition(async () => {
        const orderedIds = newBrands.map(b => b.id);
        const res = await updateBrandsOrder(orderedIds);
        if (res && !res.success) {
          alert(`Failed to update order: ${res.error}`);
          setBrands(brands); // Revert UI
        } else {
          router.refresh();
        }
      });
    }
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col bg-white">
        {brands.map((brand) => (
          <div key={brand.id} className="p-4 px-6 flex items-center justify-between border-b border-slate-100 opacity-50">
            <div className="flex items-center gap-4">
              <div className="p-1.5 rounded-lg text-slate-300">
                <GripVertical size={20} />
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden shrink-0">
                {brand.logo_url ? (
                  <div className="w-full h-full relative">
                    <Image src={brand.logo_url} alt={brand.name} fill className="object-cover" sizes="48px" />
                  </div>
                ) : (
                  <span className="font-bold text-lg text-slate-400">{brand.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{brand.name}</h3>
                <p className="text-xs text-slate-500">/{brand.slug} • Order: {brand.order}</p>
              </div>
            </div>
            <BrandActions id={brand.id} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute top-2 right-4 z-20 flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-full text-xs font-bold">
          <Loader2 size={14} className="animate-spin" /> Saving Order...
        </div>
      )}
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={brands.map(b => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col bg-white">
            {brands.map((brand) => (
              <SortableBrandRow key={brand.id} brand={brand} />
            ))}
            {brands.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No brands found.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
