/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import { useRef } from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"

import { useSiteMetadata } from "hooks"
import Header from "../header"
import Footer from "../footer"
import SiteMetadata from "./site-metadata"
import ScrollTo from "../common/scroll-to"

const Layout = ({ children, metadata }) => {
  const siteMetadata = useSiteMetadata()
  const { pathname } = useLocation()
  const refToTop = useRef(null)
  const seo = { ...siteMetadata, ...metadata, pathname }

  const { title, menuLinks, location, social } = siteMetadata

  return (
    <Container sx={{ maxWidth: "1200px" }}>
      <SiteMetadata {...seo} />
      <Header ref={refToTop} title={title} menuLinks={menuLinks} />
      <main>
        <Container p={3}>{children}</Container>
      </main>
      <Footer location={location} social={social} />
      <ScrollTo to={refToTop} />
    </Container>
  )
}

Layout.defaultProps = {
  metadata: {},
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.object,
}

export default Layout
