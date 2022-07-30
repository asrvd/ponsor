import { useSession, getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { GetServerSideProps } from "next";
import Header from "../components/Header";
import Preview from "../components/Preview";
import PonsorForm from "../components/Form";
import { useState } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { getIcon } from "../lib/getIcon";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import type { FormData, DashboardProps, Slug } from "../lib/types";

const prisma = new PrismaClient();

export default function Dashboard(props: DashboardProps) {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    name: props?.widget?.name
      ? props?.widget?.name
      : (session?.user?.name as string),
    image: props?.widget?.avatar
      ? props?.widget?.avatar
      : (session?.user?.image as string),
    previewImage: props?.widget?.avatar
      ? props?.widget?.avatar
      : (session?.user?.image as string),
    rawImage: null,
    heading: props?.widget?.heading
      ? props?.widget?.heading
      : "loved the project? help me create more!",
    links: props?.links
      ? props?.links.map((link) => {
          return {
            url: link.url,
            title: link.title,
            icon: getIcon(link.type as Slug),
            type: link.type,
          };
        })
      : [],
  });

  let imageURL: string | null = null;

  const handleSave = async () => {
    if (formData.rawImage) {
      imageURL = await uploadImage();
    }

    let toastId = toast.loading("Saving...");

    const res = await axios.post("/api/widget", {
      name: formData.name,
      heading: formData.heading,
      avatar: imageURL !== null ? imageURL : formData.image,
      links: formData.links.map((link) => {
        return {
          url: link.url,
          title: link.title,
          type: link.type,
        };
      }),
    });

    if (res.status === 200) {
      toast.success("Saved!", {
        id: toastId,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error("Error saving! Try Again!", {
        id: toastId,
      });
    }
  };

  const uploadImage = async () => {
    const fileData = new FormData();
    fileData.append("file", formData.rawImage);
    fileData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
    );
    try {
      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          fileData
        )
        .then((res) => {
          return res.data.secure_url;
        });
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <div className="relative gap-4 pb-20 flex flex-col justify-center items-center min-w-screen min-h-screen bg-gray-900 px-3 overflow-x-hidden">
      {session?.user ? (
        <div className="flex flex-col min-h-screen lg:w-2/3 w-full gap-3">
          <div className="w-full max-h-[10%]">
            <Header
              image={
                props?.widget?.avatar
                  ? props?.widget?.avatar
                  : session?.user?.image
              }
              name={session?.user.name}
            />
          </div>
          <div className="flex w-full h-full gap-2  flex-col md:flex-col lg:flex-row p-0 lg:py-20 lg:px-10">
            <Preview
              av={
                props?.widget?.avatar
                  ? props?.widget?.avatar
                  : session?.user.image
              }
              name={formData.name}
              uploadedAv={formData.previewImage}
              links={formData.links}
              heading={formData.heading}
            />

            <PonsorForm
              widget={props?.widget}
              links={props?.links?.map((link) => {
                return {
                  url: link.url,
                  title: link.title,
                  type: link.type,
                  icon: getIcon(link.type as Slug),
                };
              })}
              uploadImage={(e: any) => {
                e.preventDefault();
                setFormData({
                  ...formData,
                  previewImage: URL.createObjectURL(e.target.files[0]),
                  rawImage: e.target.files[0],
                });
              }}
              addLink={(link: any) =>
                setFormData({ ...formData, links: [...formData.links, link] })
              }
              removeLink={(linkName: string) => {
                setFormData({
                  ...formData,
                  links: formData.links.filter(
                    (link: any) => link.title !== linkName // here
                  ),
                });
              }}
              setHeading={(head: string) => {
                setFormData({ ...formData, heading: head });
              }}
              setName={(name: string) => {
                setFormData({ ...formData, name: name });
              }}
              handleSave={handleSave}
            />
          </div>
        </div>
      ) : (
        <h2>not signed in</h2>
      )}
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const sess = await getSession(context);

  if (!sess) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const widget = await prisma.widget.findUnique({
    where: {
      userId: sess.user.id,
    },
  });

  if (widget) {
    const links = await prisma.link.findMany({
      where: {
        widgetId: widget.id,
      },
    });
    return {
      props: {
        session: sess,
        widget: widget,
        links: links,
      },
    };
  }

  return {
    props: {
      session: sess,
    },
  };
};
