import { useInfiniteQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../queryClient"
import GET_PRODUCTS, { Products } from "../../graphql/products"
import ProductList from "../../components/product/list"
import { useEffect, useRef } from "react"
import useIntersection from "../../hooks/useIntersection"
import ProductItem from "../../components/product/item"



const ProductListPage = () => {
    
    const fetchMoreRef = useRef<HTMLDivElement>(null)
    const intersecting = useIntersection(fetchMoreRef)


    const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<Products>(
        [QueryKeys.PRODUCTS,false],
        ({ pageParam = '' }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
        {
            getNextPageParam: lastPage => {
                return lastPage.products.at(-1)?.id
            }
        }
    )

    useEffect(() => {
        if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return
        fetchNextPage()
    }, [intersecting])

    return (
        <div>
            <h2>상품 목록</h2>
            <ProductList list={data?.pages || []} Item={ProductItem} />
            <div ref={fetchMoreRef} />
        </div>
    )
}

export default ProductListPage