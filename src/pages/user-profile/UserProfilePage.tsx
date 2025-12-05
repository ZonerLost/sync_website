import React from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/shared/layout/PageContainer";
import SlideOver from "../../components/shared/overlay/SlideOver";
import ProfileHeaderCard from "../../components/userProfile/ProfileHeaderCard";
import UserSettingsList, {
  type LanguageOption,
} from "../../components/userProfile/UserSettingsList";
import EditProfilePanel, {
  type EditProfileValues,
} from "../../components/userProfile/EditProfilePanel";
import ChangePasswordPanel, {
  type ChangePasswordValues,
} from "../../components/userProfile/ChangePasswordPanel";
// import { useAuth } from "../../auth/AuthProvider"; // if you have it

interface UserProfileState {
  name: string;
  email: string;
  avatarUrl?: string;
}

const UserProfilePage: React.FC = () => {
  // const { logout, user } = useAuth(); // example
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = React.useState<UserProfileState>({
    name: "Christopher Henry",
    email: "christopherhenry344@gmail.com",
    avatarUrl: undefined,
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] =
    React.useState(false);
  const [language, setLanguage] =
    React.useState<LanguageOption>("English");
  const [showLogoutConfirm, setShowLogoutConfirm] =
    React.useState(false);

  const handleEditSave = (values: EditProfileValues) => {
    setUserProfile((prev) => ({
      ...prev,
      name: values.name,
      email: values.email,
      avatarUrl: values.avatarUrl ?? undefined,
    }));
    setIsEditProfileOpen(false);
  };

  const handleChangePasswordSubmit = (values: ChangePasswordValues) => {
    // TODO: call your API here
    console.log("Change password:", values);
    setIsChangePasswordOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    // if you have auth context: logout();
    // clear tokens/storage here if needed
    navigate("/login", { replace: true });
  };

  return (
    <PageContainer fullWidth>
      <h1 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
        User Profile
      </h1>

      <ProfileHeaderCard
        name={userProfile.name}
        email={userProfile.email}
        avatarUrl={userProfile.avatarUrl}
        onEditClick={() => setIsEditProfileOpen(true)}
      />

      <UserSettingsList
        onChangePassword={() => setIsChangePasswordOpen(true)}
        onLanguageClick={() => console.log("Language clicked")}
        language={language}
        onLanguageChange={setLanguage}
        onLogout={handleLogout}
      />

      {/* Edit Profile slide-over */}
      <SlideOver
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        widthClassName="max-w-sm"
      >
        <EditProfilePanel
          initialName={userProfile.name}
          initialEmail={userProfile.email}
          initialAvatarUrl={userProfile.avatarUrl}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleEditSave}
        />
      </SlideOver>

      {/* Change Password slide-over */}
      <SlideOver
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        widthClassName="max-w-sm"
      >
        <ChangePasswordPanel
          onClose={() => setIsChangePasswordOpen(false)}
          onSubmit={handleChangePasswordSubmit}
        />
      </SlideOver>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl shadow-slate-500/30">
            <h3 className="text-lg font-semibold text-gray-900">Log out?</h3>
            <p className="mt-2 text-sm text-gray-600">
              You will be returned to the login page.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default UserProfilePage;
