// @flow

import React from 'react'
import ProductPage from '../ProductPage'

import PreviewActions from './PreviewActions'

import type { Props as ProductPageProps } from '../ProductPage'
import type { Props as PreviewActionsProps } from './PreviewActions'

export type Props = ProductPageProps & PreviewActionsProps

const PreviewProductPage = ({ product, streams, onSave }: Props) => (
    <div>
        <PreviewActions onSave={onSave} />
        <ProductPage product={product} streams={streams} showRelated={false} />
    </div>
)

export default PreviewProductPage