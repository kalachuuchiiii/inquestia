# Modal Refactoring Guide: Moving to shadcn Dialog

This guide shows how to consolidate separate modal files into their respective page/component using shadcn's `Dialog` component.

## ✅ Benefits

- **Reduced file bloat**: No more separate modal files scattered across the project
- **Cleaner state management**: Use simple `useState` instead of prop drilling
- **Better co-location**: Modal logic lives with the feature
- **Smaller bundle**: Less redundant modal wrapper code
- **No extra dependencies**: Uses existing `@radix-ui/react-dialog`

---

## 🔄 Example: Logout Modal → Settings Page

### Before (Separate Modal File)

**File: `src/components/modals/LogoutModal.tsx`**
```tsx
const LogoutModal = ({ onClose = () => {} }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [logout, { isLoading }] = useAsync(async() => {
    const res = await fetchApi("post", "/user/logout");
    if(res?.success){
      dispatch(resetState());
      nav("/login");
    }
  })

  return (
    <ModalStyle label="Logging Out" onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <Notice className="text-sm">Are you sure you want to log out?</Notice>
        <div className="flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-5 py-2">Cancel</button>
          <Button onClick={logout} loadingState={isLoading} disabled={isLoading}>
            <p className="text-red-500">Yes, Log me out</p>
          </Button>
        </div>
      </div>
    </ModalStyle>
  )
}
```

**File: `src/pages/authenticated/Settings.tsx`**
```tsx
const SettingsPage = () => {
  // Modal state scattered in parent
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  return (
    <div>
      <AnimatePresence>
        {isLogoutModalOpen && (
          <LogoutModal onClose={() => setIsLogoutModalOpen(false)} />
        )}
      </AnimatePresence>
      <SettingButton onClick={() => setIsLogoutModalOpen(true)}>
        <span className="text-red-500 font-semibold">Logout</span>
      </SettingButton>
    </div>
  );
};
```

---

### After (Using Dialog)

**File: `src/pages/authenticated/Settings.tsx`**
```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: async () => {
      const promise = API.post("/api/auth/logout");
      await toast.promise(promise, {
        loading: "Logging you out...",
        success: "Log out success!",
        error: (err) => err.response.data.message || "Internal Server Error.",
      });
      return await promise;
    },
    onSuccess: (res) => {
      if (res.data.success) {
        dispatch(resetState());
        setIsLogoutDialogOpen(false);
        nav("/login");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      {/* ... other settings ... */}

      {/* Logout Dialog - All logic inline! */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogTrigger asChild>
          <SettingButton>
            <span className="text-red-500 font-semibold">Logout</span>
          </SettingButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              You'll need to log in again to access your account. 
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <button
              onClick={() => setIsLogoutDialogOpen(false)}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              onClick={() => handleLogout()}
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
            >
              {isPending ? "Logging out..." : "Yes, Log me out"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
```

---

## 📋 General Pattern

Use this structure for any modal conversion:

```tsx
// 1. Import Dialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const YourPage = () => {
  // 2. Add state for dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 3. Add your mutation/async logic
  const { mutate: handleAction, isPending } = useMutation({
    mutationFn: async () => {
      // Your API call here
    },
    onSuccess: () => {
      setIsDialogOpen(false); // Close dialog on success
      // Handle success
    },
  });

  return (
    <div>
      {/* 4. Wrap trigger button with DialogTrigger */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>

        {/* 5. Add content inside DialogContent */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>

          {/* Your form/content here */}

          <DialogFooter>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
            <button onClick={() => handleAction()} disabled={isPending}>
              {isPending ? "Loading..." : "Confirm"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
```

---

## 🎯 Modals to Refactor

Based on your current modal folder, here are the modals you can convert:

### Priority 1: Simple Confirmation Dialogs
- ✅ **LogoutModal** → Settings.tsx (DONE)
- 🔄 **DeleteSurveyConfirmation.tsx** → SurveyCard component
- 🔄 **UnauthorizedModal.tsx** → Keep or move to layout (already fairly simple)

### Priority 2: Form-based Dialogs
- 🔄 **PointDeductionModal.tsx** → ReportedCard component (admin)
- 🔄 **BanUserModal.tsx** → ReportedCard component (admin)
- 🔄 **ReportUserModal.tsx** → User profile component
- 🔄 **ReportSurveyModal.tsx** → SurveyCard component

### Priority 3: Edit/Advanced Modals
- 🔄 **SearchUserModal.tsx** → Keep as separate component (too complex) OR refactor with Dialog
- 🔄 **NewQuestion.tsx** → CreateSurvey page
- 🔄 `/edit/` modals → EditProfile.tsx (already good pattern)

---

## 📝 Step-by-Step for Each Modal

### 1. DeleteSurveyConfirmation Example

**Original usage in SurveyCard:**
```tsx
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

return (
  <>
    <AnimatePresence>
      {isDeleteModalOpen && (
        <DeleteSurveyConfirmation 
          onClose={() => setIsDeleteModalOpen(false)}
          surveyId={_id}
        />
      )}
    </AnimatePresence>
    <button onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
  </>
);
```

**Refactored with Dialog:**
```tsx
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const { mutate: handleDelete, isPending } = useMutation({
  mutationFn: async () => {
    const res = await fetchApi("delete", `/survey/${_id}`);
    return res;
  },
  onSuccess: () => {
    setIsDeleteDialogOpen(false);
    // Refresh surveys list
  },
});

return (
  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
    <DialogTrigger asChild>
      <button>Delete Survey</button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Survey?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. All responses will be deleted.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</button>
        <button onClick={() => handleDelete()} disabled={isPending}>
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
```

---

## 🚀 Best Practices

### ✅ DO:
- Keep dialog logic **in the same file** as the trigger button
- Use `Dialog.open` and `Dialog.onOpenChange` for controlled state
- Handle `onSuccess` to close dialog automatically
- Use `DialogTrigger asChild` to wrap custom buttons
- Group related dialogs in the same section

### ❌ DON'T:
- Don't use `AnimatePresence` with Dialog (Dialog handles animations)
- Don't keep dialog state in parent and pass as props (defeats the purpose)
- Don't remove `LogoutModal.tsx` until all references are updated
- Don't make dialogs that are used in multiple components (create separate component or reuse carefully)

---

## 🔧 Cleanup Checklist

After converting each modal:

- [ ] Update imports in all files using the old modal
- [ ] Remove `AnimatePresence` wrapping
- [ ] Delete the old modal file
- [ ] Test the dialog behavior (open, close, submit, error states)
- [ ] Check loading states and error handling
- [ ] Verify animations work (Dialog has built-in fade/zoom)

---

## 🎨 Styling Tips

The Dialog component already includes good defaults, but you can customize:

```tsx
<DialogContent className="max-w-md"> {/* Custom width */}
  {/* ... */}
</DialogContent>

<DialogHeader className="text-left"> {/* Change alignment */}
  {/* ... */}
</DialogHeader>
```

---

## 📚 API Reference

### Dialog Components Available:

```tsx
import {
  Dialog,                // Root wrapper
  DialogTrigger,         // Button that opens dialog
  DialogContent,         // Main container (handles overlay)
  DialogHeader,          // Top section (usually title + description)
  DialogTitle,           // Heading
  DialogDescription,     // Subtitle/explanation
  DialogFooter,          // Bottom section (usually buttons)
  DialogClose,           // Hidden close button (for custom implementations)
  DialogPortal,          // Portal target
  DialogOverlay,         // Backdrop overlay
} from "@/components/ui/dialog";
```

### Key Props:

```tsx
<Dialog 
  open={boolean}              // Control open state
  onOpenChange={handler}      // Called when dialog tries to open/close
>
  <DialogTrigger 
    asChild                   // Wrap custom element as trigger
  />
  
  <DialogContent 
    showCloseButton={true}    // X button in top right
  />
</Dialog>
```

---

## ❓ FAQ

**Q: What about modals that are reused in multiple places?**
A: Extract them as separate components but still use Dialog. Don't go back to separate modal files.

**Q: Should I convert ModalStyle.tsx usages?**
A: Yes, gradually. ModalStyle relies on portals and custom animations. Dialog is better.

**Q: Can I still use the toast notifications?**
A: Yes! Use `sonner` for notifications and Dialog for confirmations.

**Q: What if I need custom animations?**
A: Dialog supports all Radix animations. Use Framer Motion context provider if needed.

---

## 📊 Migration Status

- ✅ LogoutModal → Settings.tsx
- ⏳ DeleteSurveyConfirmation → Awaiting conversion
- ⏳ PointDeductionModal → Awaiting conversion
- ⏳ BanUserModal → Awaiting conversion
- ⏳ ReportSurveyModal → Awaiting conversion
- ⏳ ReportUserModal → Awaiting conversion
- ⏳ NewQuestion → Awaiting conversion
- ⏳ Edit modals → Awaiting review
- 🔍 SearchUserModal → Complex, needs evaluation

---

## 🎓 Learning Resources

- [Radix Dialog Docs](https://www.radix-ui.com/docs/primitives/dialog)
- [shadcn Dialog Docs](https://ui.shadcn.com/docs/components/dialog)
- [React Hooks: useState](https://react.dev/reference/react/useState)
