"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { PlusIcon, PencilIcon, TrashBinIcon } from "@/icons";
import {
  useAmenitiesList,
  useCreateAmenity,
  useUpdateAmenity,
  useDeleteAmenity,
} from "@/lib/api/hooks";
import { mapApiAmenityToDisplay, type AmenityDisplay } from "@/lib/api/types";

const PAGE_SIZE = 50;

export default function AmenitiesManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AmenityDisplay | null>(null);
  const [formName, setFormName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useAmenitiesList({
    page_id: 1,
    page_size: PAGE_SIZE,
  });
  const createMutation = useCreateAmenity();
  const updateMutation = useUpdateAmenity();
  const deleteMutation = useDeleteAmenity();

  const raw = data?.data as { amenities?: unknown[] } | unknown[] | undefined;
  const list = Array.isArray(raw) ? raw : raw?.amenities ?? [];
  const items: AmenityDisplay[] = list.map((a) =>
    mapApiAmenityToDisplay(a as { id: string; amenity?: string; amenities?: string; created_at?: string })
  );

  const openCreate = useCallback(() => {
    setEditing(null);
    setFormName("");
    setModalOpen(true);
  };

  const openEdit = useCallback((amenity: AmenityDisplay) => {
    setEditing(amenity);
    setFormName(amenity.name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setFormName("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    const name = formName.trim();
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, body: { id: editing.id, amenities: name } },
        { onSuccess: closeModal }
      );
    } else {
      createMutation.mutate({ amenity: name }, { onSuccess: closeModal });
    }
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      deleteMutation.mutate(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const isBusy = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-center py-16 text-theme-sm text-gray-500 dark:text-gray-400">
          Loading amenities…
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <p className="text-theme-sm text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load amenities."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            All amenities
          </h3>
          <Button size="sm" startIcon={<PlusIcon className="size-4" />} onClick={openCreate}>
            Add amenity
          </Button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Description
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {items.map((amenity) => (
                <TableRow key={amenity.id}>
                  <TableCell className="px-5 py-4 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {amenity.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                    {amenity.description ?? "—"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-end">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(amenity)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-primary-10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary-50"
                        aria-label="Edit"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(amenity.id)}
                        disabled={deleteMutation.isPending}
                        className={`rounded-lg p-2 transition-colors ${
                          deleteConfirm === amenity.id
                            ? "bg-klusta-error-10 text-klusta-error dark:bg-klusta-error/20"
                            : "text-gray-500 hover:bg-klusta-error-10 hover:text-klusta-error dark:hover:bg-klusta-error/20"
                        }`}
                        aria-label="Delete"
                      >
                        <TrashBinIcon className="size-4" />
                      </button>
                      {deleteConfirm === amenity.id && (
                        <span className="text-theme-xs text-klusta-error">Click again to delete</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {items.length === 0 && (
          <div className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
            No amenities yet. Click &quot;Add amenity&quot; to create one.
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} className="max-w-[500px] p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            {editing ? "Edit amenity" : "Add amenity"}
          </h4>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="e.g. WiFi"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isBusy}>
              {editing ? (updateMutation.isPending ? "Saving…" : "Save changes") : createMutation.isPending ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
