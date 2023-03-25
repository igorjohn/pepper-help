import axios from "axios";

const StrapiBaseURL = 'http://localhost:1337/api';

export default class PublicContentService {
    getDateCreated(slug) {
        const slugUrl = `${StrapiBaseURL}/helps?filters[slug][$eq]=${slug}&[isPublic][$eq]=true`;
        return axios.get(slugUrl).then((res) => res.data.data[0].attributes.createdAt);
    }

    getContentSlug(slug) {
        const slugUrl = `${StrapiBaseURL}/helps?filters[slug][$eq]=${slug}&[isPublic][$eq]=true`;
        return axios.get(slugUrl).then((res) => {

            if (res.data.data.length > 0) {
                this.dateCreated = res.data.data[0].attributes.createdAt;
                return res.data.data[0].attributes.content
            } else {
                return false;
            }
        });
    }

}
