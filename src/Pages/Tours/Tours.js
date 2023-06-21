import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToursList, selectCountTours } from "../../store/reducers/tours";
import { Pagination } from "../../Components"
import placeholder from "../../assets/images/placeholder.png"
export const Tours = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [staticData, setStaticData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const dispatch = useDispatch();

    const limit = 10;
    const gotoFirstPage = () => {
        setPage(1);
    };
    const handlePageForward = () => {
        setPage((page) => page + 1);
    };
    const handlePageBackward = () => {
        if (page > 1) setPage((page) => page - 1);
    };
    const gotoLastPage = () => {
        if (pagination.pages) setPage(pagination.pages);
    };



    const toursList = useSelector(selectCountTours);

    const apiCall = async (page, pageLimit) => {
        setLoading(true);
        let response = await dispatch(getToursList({
            page: page, limit: pageLimit
        }))
        let resp = response.payload
        console.log("response", resp)
        if (resp.data.length > 0) {
            setData(resp.data);
            const pagination = {
                current: resp?.current,
                range: resp?.range,
                total: resp?.total_records,
                pages: Math.ceil(resp?.total_records / limit),
                rows: resp?.data?.length,
            };
            setPagination({ ...pagination });
        }
        setLoading(false);
    };

    useEffect(() => {
        apiCall(page, limit);
    }, []);
    useEffect(() => {
        apiCall(page, limit);
    }, [page]);

    return <Grid container>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align={"center"} >
                            {"Thumbnail"}
                        </TableCell>
                        <TableCell align={"center"} >
                            {"Title"}
                        </TableCell>
                        <TableCell align={"center"} >
                            {"Price"}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {toursList && toursList.data && toursList.data && toursList.data.map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.slug}>
                                <TableCell align={'center'}>
                                    <img src={`http://localhost:3002/uploads/${row.thumbnailImage}`}
                                        width={60}
                                        height={60}
                                        style={{ borderRadius: '15px' }}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = placeholder;
                                        }}
                                    />
                                </TableCell>
                                <TableCell align={'center'}>
                                    {row.title}
                                </TableCell>
                                <TableCell align={'center'}>
                                    {row.price}
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        {pagination && (
            <Grid container>
                <Pagination
                    gotoFirstPage={gotoFirstPage}
                    handlePageForward={handlePageForward}
                    handlePageBackward={handlePageBackward}
                    gotoLastPage={gotoLastPage}
                    pagination={pagination}
                    page={page}
                    limit={limit}
                />
            </Grid>
        )}
    </Grid>
}