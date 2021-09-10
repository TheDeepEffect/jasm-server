import { extendType } from "nexus";
import { v2 } from "cloudinary"
import { CLOUDINARY_SECRET } from "../../utils/constants";

export const signature = extendType({
    type: "Query",
    definition(t) {
        t.field("signature", {
            type: "Signature",
            resolve() {
                const timestamp = Math.round(new Date().getTime() / 1000);

                const signature = v2.utils.api_sign_request({
                    timestamp,
                },
                    CLOUDINARY_SECRET
                )

                return { signature, timestamp }
            }
        })
    }
})