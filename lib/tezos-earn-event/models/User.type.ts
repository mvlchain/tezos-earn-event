export type User = {
  id: string;
  email: string | null;
  name: string;
  /**
   * URI of Avatar Image
   */
  avatar: string | null;
  /**
   * @DtoUpdateOptional @DtoCreateOptional
   */
  pending: boolean;
  createdAt: Date;
  updatedAt: Date;
  country: string | null;
  data: object | null;
  deletedAt: Date | null;
};
