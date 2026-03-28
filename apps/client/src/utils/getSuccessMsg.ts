

export const getSuccessMsg = (res: any) => {
    return res?.data?.message ?? 'Success';
}