import React, { useRef } from "react";
import { Container, Link, Box } from "@mui/material";

import Support from "./homepage/Support";
import Community from "./homepage/Community";
import Plan from "./homepage/Plan";
import About from "./homepage/About";
import Features from "./homepage/Features";

function HomePage() {
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const communityRef = useRef(null);
  const planRef = useRef(null);
  const supportRef = useRef(null);

  const refs = {
    About: aboutRef,
    Features: featuresRef,
    Community: communityRef,
    Plan: planRef,
    Support: supportRef,
  };

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Container
        ref={aboutRef}
        maxWidth="md"
        sx={{ textAlign: "center", my: 4 }}
      >
        <About />
      </Container>
      <Container
        ref={featuresRef}
        maxWidth="md"
        sx={{ textAlign: "center", my: 4 }}
      >
        <Features />
      </Container>
      <Container
        ref={communityRef}
        maxWidth="md"
        sx={{ textAlign: "center", my: 4 }}
      >
        <Community />
      </Container>
      <Container
        ref={planRef}
        maxWidth="md"
        sx={{ textAlign: "center", my: 4 }}
      >
        <Plan />
      </Container>
      <Container
        ref={supportRef}
        maxWidth="md"
        sx={{ textAlign: "center", my: 4 }}
      >
        <Support />
      </Container>
      <Box display="flex" justifyContent="center" p={1} flexWrap="wrap">
        {["About", "Features", "Community", "Plan", "Support"].map(
          (section) => (
            <Link
              key={section}
              component="button"
              variant="body2"
              onClick={() => handleScroll(refs[section])}
              sx={{ mx: 1 }}
            >
              {section}
            </Link>
          )
        )}
      </Box>
    </>
  );
}

export default HomePage;
