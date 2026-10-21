"use client";

import { useState } from "react";
import { AdminSidebar, type AdminTab } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { DashboardOverview } from "./dashboard-overview";
import { UsersTable } from "./users-table";
import { ProductsTable } from "./products-table";
import { EnquiriesTable } from "./enquiries-table";
import { initialEnquiries } from "./mock-data";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const pendingEnquiriesCount = initialEnquiries.filter(
    (e) => e.status === "Pending"
  ).length;

  function handleOpenAddProduct() {
    setActiveTab("products");
    setIsAddProductModalOpen(true);
  }

  return (
    <div className="flex min-h-screen bg-[#FBF9F5] text-[#1C1B1A] font-[family-name:var(--font-inter)]">
      {/* Sleek Neutral / Dark Luxury Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        enquiriesPendingCount={pendingEnquiriesCount}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <AdminTopbar
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* View Canvas with luxury off-white palette */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="mx-auto max-w-[1360px]">
            {activeTab === "dashboard" && (
              <DashboardOverview
                onNavigateTab={setActiveTab}
                onOpenAddProduct={handleOpenAddProduct}
              />
            )}

            {activeTab === "users" && <UsersTable />}

            {activeTab === "products" && (
              <ProductsTable
                isAddModalOpenInitially={isAddProductModalOpen}
                onCloseAddModal={() => setIsAddProductModalOpen(false)}
              />
            )}

            {activeTab === "enquiries" && <EnquiriesTable />}
          </div>
        </main>
      </div>
    </div>
  );
}

