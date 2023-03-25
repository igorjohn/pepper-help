import axios from "axios";

const StrapiBaseURL = 'https://strapi-116083-0.cloudclusters.net/api';

export default class PublicContentService {
    getContent(slug) {
        const slugUrl = `${StrapiBaseURL}/helps?filters[slug][$eq]=${slug}&[isPublic][$eq]=true`;
        return axios.get(slugUrl).then((res) => {

            if (res.data.data.length > 0) {

                console.log(res.data.data)
                return {
                    content: res.data.data[0].attributes.content,
                    title: res.data.data[0].attributes.title,
                    author: res.data.data[0].attributes.author,
                    createdAt: res.data.data[0].attributes.createdAt,
                    updatedAt: res.data.data[0].attributes.updatedAt,
                    slug: res.data.data[0].attributes.slug
                }
            } else { return false }
        });
    }
}