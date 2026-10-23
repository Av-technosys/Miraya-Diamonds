"use client";

import { useState } from "react";
import { AdminSidebar, type AdminTab } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { DashboardOverview } from "./dashboard-overview";
import { UsersTable } from "./users-table";
import { ProductsTable } from "./products-table";
import { CategoriesTable } from "./categories-table";
import { EnquiriesTable } from "./enquiries-table";
import type { EnquiryListResult } from "@/lib/enquiries";
import { type AdminProduct } from "./mock-data";
import type { AdminUserView } from "@/lib/actions/users";
import type { Category } from "@/lib/db/schema";

interface AdminPanelProps {
  initialUsers?: AdminUserView[];
  initialProducts?: AdminProduct[];
  initialCategories?: Category[];
  initialEnquiriesResult: EnquiryListResult;
}

export function AdminPanel({
  initialUsers = [],
  initialProducts = [],
  initialCategories = [],
  initialEnquiriesResult,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const [pendingEnquiriesCount, setPendingEnquiriesCount] = useState(
    initialEnquiriesResult.success ? initialEnquiriesResult.summary.under_review : 0
  );

  function handleOpenAddProduct() {
    setActiveTab("products");
    setIsAddProductModalOpen(true);
  }

  return (
    <div className="h-dvh overflow-hidden bg-[#FCF9F8] text-[#353333] font-[family-name:var(--font-inter)]">
      {/* Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        enquiriesPendingCount={pendingEnquiriesCount}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Content */}
      <div className="flex h-full min-w-0 flex-col lg:ml-60">
        {/* Topbar */}
        <AdminTopbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Active page */}
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8 lg:p-10">
          <div className="mx-auto min-w-0 max-w-[1440px]">
            {activeTab === "dashboard" && (
              <DashboardOverview
                onNavigateTab={setActiveTab}
                onOpenAddProduct={handleOpenAddProduct}
                usersCount={initialUsers.length}
                products={initialProducts}
                categoriesCount={initialCategories.length}
                enquiriesResult={initialEnquiriesResult}
              />
            )}

            {activeTab === "users" && (
              <UsersTable initialUsers={initialUsers} />
            )}

            {activeTab === "products" && (
              <ProductsTable
                initialProducts={initialProducts}
                isAddModalOpenInitially={isAddProductModalOpen}
                onCloseAddModal={() => setIsAddProductModalOpen(false)}
              />
            )}

            {activeTab === "categories" && (
              <CategoriesTable initialCategories={initialCategories} />
            )}

            {activeTab === "enquiries" && <EnquiriesTable initialResult={initialEnquiriesResult} onPendingCountChange={setPendingEnquiriesCount} />}
          </div>
        </main>
      </div>
    </div>
  );
}

