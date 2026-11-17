"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar, type AdminTab } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";

const EnquiryCountContext = createContext<(count: number) => void>(() => {});
export const useEnquiryCount = () => useContext(EnquiryCountContext);

export function AdminShell({ children, pendingCount }: { children: React.ReactNode; pendingCount: number }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [count, setCount] = useState(pendingCount);
  const section = pathname.split("/")[2];
  const activeTab: AdminTab = section === "products" || section === "categories" || section === "users" || section === "enquiries" ? section : "dashboard";

  return (
    <EnquiryCountContext.Provider value={setCount}>
      <div className="h-dvh overflow-hidden bg-[#FCF9F8] font-[family-name:var(--font-inter)] text-[#353333]">
        <AdminSidebar activeTab={activeTab} enquiriesPendingCount={count} isOpenMobile={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <div className="flex h-full min-w-0 flex-col lg:ml-60">
          <AdminTopbar onOpenMobileSidebar={() => setMobileOpen(true)} />
          <main key={pathname} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8 lg:p-10">
            <div className="mx-auto min-w-0 max-w-[1440px]">{children}</div>
          </main>
        </div>
      </div>
    </EnquiryCountContext.Provider>
  );
}
