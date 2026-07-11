import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { ActiveThemeProvider } from '@/components/themes/active-theme';
// import { InfoSidebar } from '@/components/layout/info-sidebar';
// import { InfobarProvider } from '@/components/ui/infobar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Dashboard Overview',
  description: 'Dashboard Overview',
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
      <ActiveThemeProvider>
          <TooltipProvider>   
              <KBar>
              <SidebarProvider defaultOpen={defaultOpen}>
                  <AppSidebar />
                  <SidebarInset>
                  <Header />
                  {/* <InfobarProvider defaultOpen={false}> */}
                      {children}
                      {/* <InfoSidebar side='right' /> */}
                  {/* </InfobarProvider> */}
                  </SidebarInset>
              </SidebarProvider>
              </KBar>
          </TooltipProvider>
      </ActiveThemeProvider>
  );
}