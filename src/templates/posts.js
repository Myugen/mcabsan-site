/** @jsx jsx */
import { css, jsx, Text, Card, Image } from "theme-ui"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Link, useIntl } from "gatsby-plugin-intl"
import readingTime from "reading-time"

import Layout from "components/layout"

const StyledLink = styled(Link)(
  css({
    color: "inherit",
    textDecoration: "none",
  })
)

const Posts = ({ data }) => {
  const posts = data.allDatoCmsPost.edges || []
  const { formatMessage, formatDate } = useIntl()
  const NoPosts = () => {
    const { formatMessage } = useIntl()
    return (
      <div>
        <h3>{formatMessage({ id: "page.posts.empty" })}</h3>
      </div>
    )
  }

  return (
    <Layout metadata={{ title: "Posts" }}>
      {!posts.length && <NoPosts />}
      {!!posts.length && (
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {posts.map(({ node }) => (
            <Card key={node.code} sx={{ marginBottom: 2 }}>
              <StyledLink to={`/posts/${node.code}`}>
                <article>
                  <header>
                    <Image src={node.image.url} alt={node.image.alt} />
                    <h2 sx={{ my: 0 }}>
                      <Text variant="title">{node.title}</Text>
                    </h2>
                    <small sx={{ fontSize: 0 }}>
                      {`${formatDate(node.datetime, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })} · ${formatMessage(
                        { id: "common.reading_time" },
                        {
                          minute: Math.ceil(
                            readingTime(node.body).minutes.toFixed(2)
                          ),
                        }
                      )}`}
                    </small>
                  </header>
                  <p sx={{ my: 0 }}>{node.description}</p>
                </article>
              </StyledLink>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allDatoCmsPost(
      filter: { stage: { eq: "publish" } }
      sort: { fields: [datetime], order: DESC }
    ) {
      edges {
        node {
          code
          title
          datetime
          description
          image {
            url
            alt
          }
          body
        }
      }
    }
  }
`

Posts.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Posts
