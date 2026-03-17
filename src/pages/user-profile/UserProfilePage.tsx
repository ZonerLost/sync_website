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
import { useAuth } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../api/core/http";
import { useMyProfile } from "../../hooks/userProfile/useMyProfile";
import { useUpdateMyProfile } from "../../hooks/userProfile/useUpdateMyProfile";
import { useChangePassword } from "../../hooks/userProfile/useChangePassword";

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: profile, isLoading, isError, refetch } = useMyProfile();
  const updateMyProfileMutation = useUpdateMyProfile();
  const changePasswordMutation = useChangePassword();

  const [language, setLanguage] = React.useState<LanguageOption>("English");
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = React.useState(false);
  const [profileError, setProfileError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);

  const handleEditSave = async (values: EditProfileValues) => {
    setProfileError(null);

    try {
      await updateMyProfileMutation.mutateAsync({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        photo: values.photo ?? null,
      });

      setIsEditProfileOpen(false);
    } catch (error) {
      setProfileError(getApiErrorMessage(error));
    }
  };

  const handleChangePasswordSubmit = async (values: ChangePasswordValues) => {
    setPasswordError(null);

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      setIsChangePasswordOpen(false);
    } catch (error) {
      setPasswordError(getApiErrorMessage(error));
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <PageContainer fullWidth>
        <div className="flex min-h-[320px] items-center justify-center">
          <p className="text-sm text-gray-500">Loading profile...</p>
        </div>
      </PageContainer>
    );
  }

  if (isError || !profile) {
    return (
      <PageContainer fullWidth>
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Failed to load profile
          </h2>
          <p className="mt-2 text-sm text-red-600">
            We could not load your profile details right now.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer fullWidth>
      <h1 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
        User Profile
      </h1>

      <ProfileHeaderCard
        name={profile.fullName}
        email={profile.email}
        avatarUrl={profile.photoUrl}
        onEditClick={() => setIsEditProfileOpen(true)}
      />

      <UserSettingsList
        onChangePassword={() => setIsChangePasswordOpen(true)}
        onLanguageClick={() => undefined}
        language={language}
        onLanguageChange={setLanguage}
        onLogout={handleLogout}
      />

      <SlideOver
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        widthClassName="max-w-sm"
      >
        <EditProfilePanel
          initialFullName={profile.fullName}
          initialEmail={profile.email}
          initialPhone={profile.phone}
          initialAvatarUrl={profile.photoUrl}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleEditSave}
          isSaving={updateMyProfileMutation.isPending}
          errorMessage={profileError}
        />
      </SlideOver>

      <SlideOver
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        widthClassName="max-w-sm"
      >
        <ChangePasswordPanel
          onClose={() => setIsChangePasswordOpen(false)}
          onSubmit={handleChangePasswordSubmit}
          isSubmitting={changePasswordMutation.isPending}
          errorMessage={passwordError}
        />
      </SlideOver>

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