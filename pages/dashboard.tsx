import {
  useSession,
  signIn,
  signOut,
  getSession,
} from "next-auth/react";
import type { Session } from "next-auth";
import { GetServerSideProps } from "next";
import Header from "../components/Header";
import Preview from "../components/Preview";
import PonsorForm from "../components/Form";
import { useState } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import type { Widget, Link } from "@prisma/client";
import { getIcon } from "../lib/getIcon";
import toast from "react-hot-toast";

const prisma = new PrismaClient();

type FormData = {
  image?: string;
  rawImage?: any;
  previewImage?: any;
  heading?: string;
  links: any[];
};

type DashboardProps = {
  session?: Session;
  widget?: Widget;
  links?: Link[];
};

type Slug =
  | "patreon"
  | "githubsponsor"
  | "kofi"
  | "buymeacoffee"
  | "opencollective"
  | "liberapay"
  | "paypal";

export default function Dashboard(props: DashboardProps) {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
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

  // async function test() {
  //   const res = await axios.post("/api/widget", {
  //     name: "ashish",
  //     heading: "loved the project? help me create more!",
  //     avatar: session?.user.image,
  //     links: [
  //       {
  //         url: "https://www.patreon.com/ashish",
  //         title: "Patreon",
  //         type: "patreon",
  //       },
  //       {
  //         url: "https://kofi.com/ashish",
  //         title: "Kofi",
  //         type: "kofi",
  //       },
  //     ],
  //   });
  //   console.log(res.data);
  // }

  let imageURL: string | null = null;

  const handleSave = async () => {
    if (formData.rawImage) {
      imageURL = await uploadImage();
    }

    let toastId = toast.loading("Saving...");

    const res = await axios.post("/api/widget", {
      name: session?.user.name,
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
      }, 1000)
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
    <div className="flex flex-col justify-center items-center min-w-screen w-screen min-h-screen bg-gray-900 px-3 overflow-x-hidden">
      {session?.user ? (
        <div className="flex flex-col min-h-screen w-full gap-3">
          <div className="w-full max-h-[10%]">
            <Header image={session?.user.image} name={session?.user.name} />
          </div>

          <Preview
            av={
              props?.widget?.avatar
                ? props?.widget?.avatar
                : session?.user.image
            }
            name={
              props?.widget?.name ? props?.widget?.name : session?.user.name
            }
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
            // handleImageUpload={(e: any) => {
            //   e.preventDefault();
            //   handleUpload(e);
            // }}
            handleSave={handleSave}
          />
        </div>
      ) : (
        <h2>not signed in</h2>
      )}
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
