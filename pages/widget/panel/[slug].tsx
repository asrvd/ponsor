import { PrismaClient } from "@prisma/client";
import WidgetComponent from "../../../components/Widget";

const prisma = new PrismaClient();

export async function getStaticPaths() {
  const widgets = await prisma.widget.findMany();
  const paths = widgets.map((widget) => ({
    params: { slug: widget.userId },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  const widget = await prisma.widget.findUnique({
    where: {
      userId: params.slug,
    },
  });
  const links = await prisma.link.findMany({
    where: {
      widgetId: widget?.id,
    },
  });

  if (widget) {
    return {
      props: {
        widget: widget,
        links: links,
      },
      revalidate: 1,
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default function Widget({ widget, links }: any) {
  return (
    <div>
      <WidgetComponent widget={widget} links={links} />
    </div>
  );
}
