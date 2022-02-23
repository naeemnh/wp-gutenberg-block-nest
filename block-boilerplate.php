<?php

/**
 * Plugin Name:       Block Boilerplate
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-boilerplate
 *
 * @package           create-block
 */

function create_block_block_boilerplate_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_block_boilerplate_block_init');
