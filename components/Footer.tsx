export default function Footer() {
  return (
    <div className="absolute bottom-0 p-2 text-center w-full flex flex-col ites-center gap-1">
      <p className="text-gray-300 text-sm">
        made with {`<3`} by{" "}
        <a
          href="https://github.com/asrvd"
          target={"_blank"}
          rel="noreferrer"
          className="text-cyan-300 underline underline-offset-2 decoration-dotted"
        >
          ashish
        </a>
      </p>
      <p className="text-gray-300 text-sm">
        for{" "}
        <a
          href="https://hashnode.com"
          target={"_blank"}
          rel="noreferrer"
          className="text-cyan-300 underline underline-offset-2 decoration-dotted"
        >
          hashnode
        </a>{" "}
        x{" "}
        <a
          href="https://planetscale.com"
          target={"_blank"}
          rel="noreferrer"
          className="text-cyan-300 underline underline-offset-2 decoration-dotted"
        >
          planetscale
        </a>{" "}
        hackathon
      </p>
    </div>
  );
}
