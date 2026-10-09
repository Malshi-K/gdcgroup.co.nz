import RootLayoutClient from "@/app/RootLayoutClient";

export const metadata = {
  verification: {
    google: "ScC550tSAdz2h5xwoWJAgmfgBMBYG_k8NLIlVmRypeE",
  },
};

export default function RootLayout({ children }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
