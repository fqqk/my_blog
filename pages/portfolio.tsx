import Layout from "components/layout";
import Container from "components/container";
import Head from "next/head";

import { BLOG_NAME } from "../lib/constants";

const Portfolio = () => {
  return (
    <Layout>
      <Container>
        <Head>
          <title>{BLOG_NAME}</title>
        </Head>
        <div className="pt-16 sp:pb-8 tab:pb-8 pc:pb-16">
          <h1 className="text-center sp:text-xl tab:text-3xl pc:text-4xl font-bold">
            Thank you for visiting this blog 🦊
          </h1>
        </div>
        <div className="flex sp:flex-col tab:flex-col pc:flex-row sp:w-full tab:w-8-12 pc:w-9/12 h-max m-auto">
          {/* 左部分 */}
          <div className="left">
            <div className="sp:w-52 sp:h-52 tab:w-60 tab:h-60 pc:w-72 pc:h-72 m-auto">
              <img
                className="rounded-[30px]"
                src={"/favicon/IT_Fox-512x512.png"}
                alt={"IT_FOX"}
              />
            </div>
            <div className="text-center mt-4 w-4/5 m-auto">
              <p className="sp:text-lg tab:text-xl pc:text-2xl font-bold">
                Mr.<span className="mr-2"></span>F
              </p>
              <p className="sp:text-sm tab:text-base pc:text-lg font-semibold">
                Web developer
              </p>
            </div>
            <div className="skill mt-4 text-sm w-3/6 m-auto sp:text-center tab:text-center pc:text-left pc:leading-loose">
              <p>MySQL</p>
              <p>Ruby on Rails</p>
              <p>JavaScript</p>
              <p>Backbone.js</p>
              <p>React</p>
              <p>Next.js</p>
              <p>Liquid</p>
            </div>
          </div>
          {/* 右部分 */}
          <div className="right sp:mt-5 tab:mt-5 pc:mt-0 pc:px-5 pc:py-5">
            <p className="sp:text-sm tab:text-base pc:text-xl sp:leading-normal tab:leading-loose pc:leading-loose italic">
              Hi, everyone. Thank you for visiting this blog. This blog is
              operated for the purpose of improving my technical skills as an
              engineer and sharing private information. If you sympathize with
              the contents of the blog or find it interesting, please get along.
              If possible, please follow me on twitter.
            </p>
            <div className="music sp:mt-5 tab:mt-10 pc:mt-10 w-full">
              <h1 className="font-semibold text-center mb-4">My Playlist</h1>
              <div className="mt-2 flex sp:flex-col tab:flex-row  pc:flex-row justify-center">
                <div className="tab:mr-4 pc:mr-4 mb-4">
                  <div className="mb-4 sp:w-full tab:w-56 pc:w-64">
                    <iframe
                      className="rounded-xl"
                      src="https://open.spotify.com/embed/artist/7lbSsjYACZHn1MSDXPxNF2?utm_source=generator&theme=0"
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="sp:w-full tab:w-56 pc:w-64">
                    <iframe
                      className="rounded-xl"
                      src="https://open.spotify.com/embed/artist/64tJ2EAv1R6UaZqc4iOCyj?utm_source=generator"
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
                <div>
                  <div className="mb-4 sp:w-full tab:w-56 pc:w-64">
                    <iframe
                      className="rounded-xl"
                      src="https://open.spotify.com/embed/artist/2EWXgN0xWOnbqJOxa9pWNO?utm_source=generator"
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="sp:w-full tab:w-56 pc:w-64">
                    <iframe
                      className="rounded-xl"
                      src="https://open.spotify.com/embed/artist/0bAsR2unSRpn6BQPEnNlZm?utm_source=generator"
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Portfolio;
