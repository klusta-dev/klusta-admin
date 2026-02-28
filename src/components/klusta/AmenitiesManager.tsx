"use client";

import React, { useState, useCallback } from "react";
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
import { mockAmenities } from "@/data/mock";
import type { Amenity } from "@/data/mock";
import { PlusIcon, PencilIcon, TrashBinIcon } from "@/icons";

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function AmenitiesManager() {
  const [items, setItems] = useState<Amenity[]>(mockAmenities);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Amenity | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = useCallback(() => {
    setEditing(null);
    setFormName("");
    setFormDescription("");
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((amenity: Amenity) => {
    setEditing(amenity);
    setFormName(amenity.name);
    setFormDescription(amenity.description ?? "");
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditing(null);
    setFormName("");
    setFormDescription("");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    if (editing) {
      setItems((prev) =>
        prev.map((a) =>
          a.id === editing.id
            ? { ...a, name: formName.trim(), description: formDescription.trim() || undefined }
            : a
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: newId(),
          name: formName.trim(),
          description: formDescription.trim() || undefined,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      setItems((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/[0.05]">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            All amenities
          </h3>
          <Button size="sm" startIcon={<PlusIcon className="size-4" />} onClick={openCreate}>
            Add amenity
          </Button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
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
                        <span className="text-theme-xs text-klusta-error">
                          Click again to delete
                        </span>
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

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        className="max-w-[500px] p-6 lg:p-8"
      >
        <form onSubmit={handleSubmit}>
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            {editing ? "Edit amenity" : "Add amenity"}
          </h4>
          <div className="space-y-5">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="e.g. WiFi"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Input
                type="text"
                placeholder="Short description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editing ? "Save changes" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
