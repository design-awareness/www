// HierarchicalTextBlocks.js
// Copyright (C) 2020
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React from "react";
import styles from "./HierarchicalTextBlocks.module.css";

export function PageHeading(props) {
  return <h1 className={styles.pageHead}>{props.children}</h1>;
}

export function PageSubhead(props) {
  return <div className={styles.pageSubhead}>{props.children}</div>;
}

export function SectionHead(props) {
  return <h2 className={styles.sectionHead}>{props.children}</h2>;
}

export function HierarchicalTextBlocksTest(props) {
  return (
    <div className={styles.demo}>
      <h2>PageHeading</h2>
      <PageHeading>Page heading</PageHeading>
      <div className={styles.dummy} />

      <h2>PageHeading (long)</h2>
      <PageHeading>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum
        pharetra augue, porta convallis ex scelerisque id.
      </PageHeading>
      <div className={styles.dummy} />

      <h2>PageSubhead</h2>
      <PageSubhead>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum
        pharetra augue, porta convallis ex scelerisque id. Sed suscipit
        efficitur arcu vel accumsan. Vestibulum justo leo, feugiat eu ligula
        vitae, dictum hendrerit odio.
      </PageSubhead>
      <div className={styles.dummy} />

      <h2>Page heading</h2>
      <PageHeading>Page heading</PageHeading>
      <PageSubhead>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum
        pharetra augue, porta convallis ex scelerisque id. Sed suscipit
        efficitur arcu vel accumsan. Vestibulum justo leo, feugiat eu ligula
        vitae, dictum hendrerit odio.
      </PageSubhead>
      <div className={styles.dummy} />

      <h2>SectionHead</h2>
      <div className={styles.dummy} />
      <SectionHead>Section heading</SectionHead>
      <div className={styles.dummy} />
    </div>
  );
}
HierarchicalTextBlocksTest.slug = "HierarchicalTextBlocks";
