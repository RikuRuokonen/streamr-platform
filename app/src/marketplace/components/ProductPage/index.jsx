// @flow

import React, { Component, type Node } from 'react'
import BN from 'bignumber.js'
import MediaQuery from 'react-responsive'
import { breakpoints } from 'streamr-layout/dist/bundle'
import classNames from 'classnames'

import Toolbar from '../Toolbar/index'
import Hero from '../Hero/index'
import type { Product } from '../../../../../marketplace/src/flowtype/product-types'
import type { StreamList } from '../../../../../marketplace/src/flowtype/stream-types'
import type { ButtonActions } from '../Buttons/index'
import Products from '../Products/index'
import withI18n from '../../../../../marketplace/src/containers/WithI18n/index'
import FallbackImage from '../FallbackImage/index'

import ProductDetails from './ProductDetails/index'
import StreamListing from './StreamListing/index'
import styles from './productPage.pcss'

const { md } = breakpoints

export type Props = {
    fetchingStreams: boolean,
    streams: StreamList,
    product: ?Product,
    relatedProducts: Array<Product>,
    showToolbar?: boolean,
    toolbarActions?: ButtonActions,
    toolbarStatus?: Node,
    showStreamActions?: boolean,
    isLoggedIn?: boolean,
    isProductSubscriptionValid?: boolean,
    onPurchase?: () => void,
    translate: (key: string, options: any) => string,
    truncateState: boolean,
    setTruncateState: () => void,
    truncationRequired: boolean,
    productDetailsRef: Object,
}

class ProductPage extends Component<Props> {
    static defaultProps = {
        fetchingStreams: false,
        showRelated: true,
        showToolbar: false,
    }

    render() {
        const {
            product,
            streams,
            fetchingStreams,
            relatedProducts,
            showToolbar,
            toolbarActions,
            showStreamActions,
            isLoggedIn,
            isProductSubscriptionValid,
            onPurchase,
            translate,
            toolbarStatus,
            truncateState,
            setTruncateState,
            truncationRequired,
            productDetailsRef,
        } = this.props
        const isProductFree = (product && BN(product.pricePerSecond).isEqualTo(0)) || false

        return !!product && (
            <div className={classNames(styles.productPage, !!showToolbar && styles.withToolbar)}>
                {showToolbar && (
                    <Toolbar status={toolbarStatus} actions={toolbarActions} />
                )}
                <Hero
                    product={product}
                    leftContent={
                        <FallbackImage
                            className={styles.productImage}
                            src={product.imageUrl || ''}
                            alt={product.name}
                        />
                    }
                    rightContent={
                        <ProductDetails
                            product={product}
                            isValidSubscription={!!isProductSubscriptionValid}
                            onPurchase={() => onPurchase && onPurchase()}
                            truncateState={truncateState}
                            setTruncateState={setTruncateState}
                            truncationRequired={truncationRequired}
                            productDetailsRef={productDetailsRef}
                        />
                    }
                />
                <StreamListing
                    product={product}
                    streams={streams}
                    fetchingStreams={fetchingStreams}
                    showStreamActions={showStreamActions}
                    isLoggedIn={isLoggedIn}
                    isProductSubscriptionValid={isProductSubscriptionValid}
                    isProductFree={isProductFree}
                    className={styles.section}
                />
                {relatedProducts.length > 0 && (
                    <MediaQuery minDeviceWidth={md.max}>
                        {(matches) => (
                            <Products
                                header={translate('productPage.relatedProducts')}
                                products={matches ? relatedProducts : relatedProducts.slice(0, 2)}
                                type="relatedProducts"
                            />
                        )}
                    </MediaQuery>
                )}
            </div>
        )
    }
}

export default withI18n(ProductPage)