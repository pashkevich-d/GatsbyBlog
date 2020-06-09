import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {Button, Badge} from 'reactstrap'
import {slugify} from '../util/utility'

const tagsPage = ({pageContext}) => {
    const {tags, tagPostCount} = pageContext
    return ( 
        <Layout pageTitle="All tags">
            <SEO title="All tags" keyword={['tags', 'topics']}/>
            <ul>
                {tags.map(tag=> (
                    <li key={tag} style={{marginBottom: '10px'}}>
                        <Button color="primary" href={`/tag/${slugify(tag)}`}>
                            {tag} <Badge color="light">{tagPostCount[tag]}</Badge>
                        </Button>
                    </li>
                ))}
            </ul>
        </Layout>
     );
}
 
export default tagsPage;