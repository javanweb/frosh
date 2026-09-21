import React, { useState } from 'react';
import { ViewExperience, UserRole } from './types';
import { LoginScreen } from './components/LoginScreen';
import { AndroidView } from './components/AndroidView';
import { WindowsView } from './components/WindowsView';
import { MasterFlowView } from './components/MasterFlowView';
import { OverviewBoardView } from './components/OverviewBoardView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUserRole, setCurrentRole] = useState<UserRole>('salesperson');
  const [currentView, setCurrentView] = useState<ViewExperience>('android');

  const handleLoginSuccess = (role: UserRole) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    // Role based destination: Manager -> Windows dashboard, Salesperson -> Android mobile app
    if (role === 'manager') {
      setCurrentView('windows');
    } else {
      setCurrentView('android');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'manager') {
      setCurrentView('windows');
    } else {
      setCurrentView('android');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Vazirmatn',sans-serif]">
      {/* Main Interactive Stage */}
      <main className="w-full">
        {!isLoggedIn ? (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            {currentView === 'android' && (
              <AndroidView
                onSwitchToWindows={() => setCurrentView('windows')}
                onLogout={handleLogout}
              />
            )}

            {currentView === 'windows' && (
              <WindowsView
                onSwitchToAndroid={() => setCurrentView('android')}
                onLogout={handleLogout}
              />
            )}

            {currentView === 'master_flow' && <MasterFlowView />}

            {currentView === 'overview_board' && (
              <OverviewBoardView
                onOpenAndroidScreen={() => setCurrentView('android')}
                onOpenWindowsDashboard={() => setCurrentView('windows')}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
