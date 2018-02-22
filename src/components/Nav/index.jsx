// @flow

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import styles from './nav.pcss'
import links from '../../links.json'

type Props = {}

type State = {}

export default class Nav extends Component<Props, State> {
    render() {
        return (
            <ul className={styles.nav}>
                <li>
                    <Link to={links.home}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={links.products}>
                        Products
                    </Link>
                </li>
                <li>
                    <Link to={links.categories}>
                        Categories
                    </Link>
                </li>
            </ul>
        )
    }
}