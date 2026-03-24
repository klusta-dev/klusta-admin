"use client";

import React, { useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { PlusIcon } from "@/icons";

interface RoleItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const INITIAL_ROLES: RoleItem[] = [
  { id: "role-1", firstName: "Ada", lastName: "Okonkwo", email: "ada@klusta.com", role: "Super Admin" },
  { id: "role-2", firstName: "Michael", lastName: "Duru", email: "michael@klusta.com", role: "Operations Manager" },
  { id: "role-3", firstName: "Evelyn", lastName: "James", email: "evelyn@klusta.com", role: "Support Agent" },
  { id: "role-4", firstName: "Tobi", lastName: "Akin", email: "tobi@klusta.com", role: "Finance Reviewer" },
];

export default function RolesList() {
  const [roles, setRoles] = useState<RoleItem[]>(INITIAL_ROLES);
  const [modalOpen, setModalOpen] = useState(false);
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState("");

  const canSubmit = useMemo(
    () =>
      formFirstName.trim().length > 0 &&
      formLastName.trim().length > 0 &&
      formEmail.trim().length > 0 &&
      formRole.trim().length > 0,
    [formEmail, formFirstName, formLastName, formRole]
  );

  const closeModal = () => {
    setModalOpen(false);
    setFormFirstName("");
    setFormLastName("");
    setFormEmail("");
    setFormRole("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newRoleItem: RoleItem = {
      id: `role-${Date.now()}`,
      firstName: formFirstName.trim(),
      lastName: formLastName.trim(),
      email: formEmail.trim(),
      role: formRole.trim(),
    };

    setRoles((prev) => [newRoleItem, ...prev]);
    closeModal();
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">All roles</h3>
          <Button size="sm" startIcon={<PlusIcon className="size-4" />} onClick={() => setModalOpen(true)}>
            Add role
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  First Name
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Last Name
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Email
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {roles.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90">
                    {item.firstName}
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                    {item.lastName}
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                    {item.email}
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                    {item.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {roles.length === 0 && (
          <div className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
            No roles found.
          </div>
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} className="mx-4 max-w-[560px] p-6 lg:p-8">
        <h4 className="text-xl font-semibold text-typography dark:text-white/90">Add new role</h4>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a role assignment record.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="role-first-name">First name</Label>
              <Input
                id="role-first-name"
                name="role-first-name"
                placeholder="Enter first name"
                value={formFirstName}
                onChange={(e) => setFormFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role-last-name">Last name</Label>
              <Input
                id="role-last-name"
                name="role-last-name"
                placeholder="Enter last name"
                value={formLastName}
                onChange={(e) => setFormLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="role-email">Email</Label>
            <Input
              id="role-email"
              name="role-email"
              type="email"
              placeholder="name@company.com"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="role-name">Role</Label>
            <Input
              id="role-name"
              name="role-name"
              placeholder="e.g. Content Moderator"
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              Add role
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
