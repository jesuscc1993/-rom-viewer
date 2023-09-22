import { Request, RouteParameters } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export type FileRequest = Request<
  RouteParameters<'/path'>,
  unknown,
  FileRequestDto,
  ParsedQs,
  Record<string, unknown>
>;

export type FileRequestDto = {
  path: string;
};
