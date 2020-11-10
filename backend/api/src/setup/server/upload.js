import fs from "fs";
import path from "path";
import multer from "multer";
import sharp from "sharp";

// App Imports
import { noop } from "../../setup/helpers/utils";
import params from "../config/params";
import { NODE_ENV } from "../config/env";
import { request, response } from "express";

// File upload configurations and
export default function (server) {
  console.info("SETUP - Upload...");

  const upload = multer({ dest: params.folder.upload }).single("file");

  // Upload route
  server.post(params.endpoint.upload, upload, (request, response) => {
    // Log info in development mode
    if (NODE_ENV === "development") {
      console.log(request.body);
    }

    try {
      fs.readFile(request.file.path, (error, file) => {
        if (!error) {
          const fileName =
            request.file.filename +
            path.extname(request.file.originalname).toLocaleLowerCase();

          try {
            if (request.body.type && params[request.body.type]) {
              sharp(file)
                .resize(
                  params[request.body.type].image.width,
                  params[request.body.type].image.height
                )
                .toFile(
                  path.join(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    "public",
                    params[request.body.type].image.folder,
                    filename
                  ),
                  (error, info) => {
                    if (!error) {
                      fs.unlink(request.file.path, noop);

                      response.json({
                        success: false,
                        file: null,
                      });
                    }
                  }
                );
            } else {
              console.error(error);

              response.json({
                success: false,
                file: null,
              });
            }
          } catch (error) {
            response.json({
              success: false,
              file: null,
            });
          }
        } else {
          response.json({
            success: false,
            file: null,
          });
        }
      });
    } catch (error) {
      console.error(error);

      response.json({
        success: false,
        file: null,
      });
    }
  });
}
