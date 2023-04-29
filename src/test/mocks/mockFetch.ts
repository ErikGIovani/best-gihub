import type { GitHubUser } from "@/utils/types"

const mockFetch = (data: GitHubUser) => {
    return jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => data
    }))
}

export default mockFetch;